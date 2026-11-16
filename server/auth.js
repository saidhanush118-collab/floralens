import crypto from 'crypto';
import { getDb } from './db.js';

const AUTH_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'floralens-secure-session-key-2026';
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Creates a cryptographically signed auth token (HMAC-SHA256).
 * Payload contains userId, email, role, and expiry timestamp.
 */
export function createAuthToken(user) {
  const payload = {
    userId: user.id,
    email: (user.email || '').toLowerCase().trim(),
    role: user.role || 'customer',
    exp: Date.now() + TOKEN_EXPIRY_MS,
    iat: Date.now(),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies token signature and checks if token is expired.
 * Returns decoded payload if valid, null otherwise.
 */
export function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Express middleware to authenticate requests.
 * Extracts Bearer token, validates signature, and verifies
 * that the user actually exists in the MongoDB database.
 * If user was deleted or does not exist, rejects with HTTP 401.
 */
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-auth-token'];
  let token = null;

  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      token = authHeader.trim();
    }
  }

  // Also check query param ?token= for special cases or event streams
  if (!token && req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. No session token provided.',
      code: 'AUTH_REQUIRED',
    });
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    return res.status(401).json({
      success: false,
      error: 'Session has expired or is invalid. Please sign in again.',
      code: 'SESSION_EXPIRED',
    });
  }

  try {
    const db = getDb();
    // Authoritatively check MongoDB users collection
    const user = await db.collection('users').findOne({
      $or: [{ id: payload.userId }, { email: payload.email }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User account no longer exists in the database. Session revoked.',
        code: 'USER_DELETED',
      });
    }

    if (user.isDeleted || user.status === 'deleted' || user.status === 'suspended') {
      return res.status(401).json({
        success: false,
        error: 'This account has been deactivated or deleted.',
        code: 'ACCOUNT_DEACTIVATED',
      });
    }

    // Attach verified user and token payload to request
    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      phone: user.phone,
      city: user.city,
      avatarUrl: user.avatarUrl,
    };
    req.tokenPayload = payload;
    next();
  } catch (err) {
    console.error('Error during token authentication against MongoDB:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify authentication status with database.',
      details: err.message,
    });
  }
}

/**
 * Express middleware to restrict endpoints to specific roles.
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required.',
        code: 'AUTH_REQUIRED',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Requires one of roles: ${roles.join(', ')}. Your role is: ${req.user.role}.`,
        code: 'FORBIDDEN',
      });
    }

    next();
  };
}
