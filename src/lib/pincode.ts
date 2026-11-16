/**
 * Indian Postal Pincode Lookup & City Resolution Utility
 * Supports live India Post API with offline structured Indian Postal Zone fallback.
 */

export interface PincodeLookupResult {
  valid: boolean;
  pincode: string;
  city: string;
  district?: string;
  state: string;
  isMetro: boolean;
  deliveryMessage: string;
  message?: string;
  error?: string;
}

// Structured Prefix Mappings for Indian Postal Zones
interface PincodeZone {
  prefix: string;
  city: string;
  state: string;
  isMetro: boolean;
  metroName?: string;
}

const INDIAN_PINCODE_ZONES: PincodeZone[] = [
  // Hyderabad & Telangana Metro (500xxx - 509xxx)
  { prefix: '500', city: 'Hyderabad', state: 'Telangana', isMetro: true, metroName: 'Hyderabad Metro' },
  { prefix: '501', city: 'Ranga Reddy / Hyderabad Suburbs', state: 'Telangana', isMetro: true, metroName: 'Hyderabad Metro' },
  { prefix: '502', city: 'Sangareddy / Medak', state: 'Telangana', isMetro: false },
  { prefix: '503', city: 'Nizamabad', state: 'Telangana', isMetro: false },
  { prefix: '504', city: 'Adilabad', state: 'Telangana', isMetro: false },
  { prefix: '505', city: 'Karimnagar', state: 'Telangana', isMetro: false },
  { prefix: '506', city: 'Warangal', state: 'Telangana', isMetro: false },
  { prefix: '507', city: 'Khammam', state: 'Telangana', isMetro: false },
  { prefix: '508', city: 'Nalgonda', state: 'Telangana', isMetro: false },
  { prefix: '509', city: 'Mahabubnagar', state: 'Telangana', isMetro: false },

  // Bangalore & Karnataka Metro (560xxx - 562xxx)
  { prefix: '560', city: 'Bangalore', state: 'Karnataka', isMetro: true, metroName: 'Bangalore Metro' },
  { prefix: '561', city: 'Bangalore Rural', state: 'Karnataka', isMetro: true, metroName: 'Bangalore Metro' },
  { prefix: '562', city: 'Bangalore Outer / Ramanagara', state: 'Karnataka', isMetro: true, metroName: 'Bangalore Metro' },
  { prefix: '570', city: 'Mysuru', state: 'Karnataka', isMetro: false },
  { prefix: '575', city: 'Mangalore', state: 'Karnataka', isMetro: false },
  { prefix: '580', city: 'Hubli-Dharwad', state: 'Karnataka', isMetro: false },
  { prefix: '590', city: 'Belagavi', state: 'Karnataka', isMetro: false },

  // Mumbai & Maharashtra Metro (400xxx)
  { prefix: '400', city: 'Mumbai', state: 'Maharashtra', isMetro: true, metroName: 'Mumbai Metro' },
  { prefix: '401', city: 'Thane / Palghar', state: 'Maharashtra', isMetro: true, metroName: 'Mumbai Metro' },
  { prefix: '411', city: 'Pune', state: 'Maharashtra', isMetro: true, metroName: 'Pune Metro' },
  { prefix: '422', city: 'Nashik', state: 'Maharashtra', isMetro: false },
  { prefix: '431', city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', isMetro: false },
  { prefix: '440', city: 'Nagpur', state: 'Maharashtra', isMetro: false },

  // Delhi NCR Metro (110xxx, 122xxx, 201xxx)
  { prefix: '110', city: 'New Delhi', state: 'Delhi', isMetro: true, metroName: 'Delhi NCR Metro' },
  { prefix: '122', city: 'Gurugram', state: 'Haryana', isMetro: true, metroName: 'Delhi NCR Metro' },
  { prefix: '201', city: 'Noida / Ghaziabad', state: 'Uttar Pradesh', isMetro: true, metroName: 'Delhi NCR Metro' },

  // Chennai & Tamil Nadu Metro (600xxx)
  { prefix: '600', city: 'Chennai', state: 'Tamil Nadu', isMetro: true, metroName: 'Chennai Metro' },
  { prefix: '603', city: 'Kanchipuram / Chengalpattu', state: 'Tamil Nadu', isMetro: true, metroName: 'Chennai Metro' },
  { prefix: '641', city: 'Coimbatore', state: 'Tamil Nadu', isMetro: false },
  { prefix: '625', city: 'Madurai', state: 'Tamil Nadu', isMetro: false },

  // Kolkata & West Bengal Metro (700xxx)
  { prefix: '700', city: 'Kolkata', state: 'West Bengal', isMetro: true, metroName: 'Kolkata Metro' },
  { prefix: '711', city: 'Howrah', state: 'West Bengal', isMetro: true, metroName: 'Kolkata Metro' },

  // Andhra Pradesh (515xxx - 535xxx)
  { prefix: '520', city: 'Vijayawada', state: 'Andhra Pradesh', isMetro: false },
  { prefix: '530', city: 'Visakhapatnam', state: 'Andhra Pradesh', isMetro: false },
  { prefix: '517', city: 'Tirupati', state: 'Andhra Pradesh', isMetro: false },
  { prefix: '522', city: 'Guntur', state: 'Andhra Pradesh', isMetro: false },

  // Gujarat (380xxx, 395xxx, etc.)
  { prefix: '380', city: 'Ahmedabad', state: 'Gujarat', isMetro: true, metroName: 'Ahmedabad Metro' },
  { prefix: '395', city: 'Surat', state: 'Gujarat', isMetro: false },
  { prefix: '390', city: 'Vadodara', state: 'Gujarat', isMetro: false },

  // Rajasthan (302xxx)
  { prefix: '302', city: 'Jaipur', state: 'Rajasthan', isMetro: true, metroName: 'Jaipur Metro' },
  { prefix: '342', city: 'Jodhpur', state: 'Rajasthan', isMetro: false },
  { prefix: '313', city: 'Udaipur', state: 'Rajasthan', isMetro: false },

  // Kerala (682xxx, 695xxx)
  { prefix: '682', city: 'Kochi / Ernakulam', state: 'Kerala', isMetro: true, metroName: 'Kochi Metro' },
  { prefix: '695', city: 'Thiruvananthapuram', state: 'Kerala', isMetro: false },

  // Madhya Pradesh (452xxx, 462xxx)
  { prefix: '452', city: 'Indore', state: 'Madhya Pradesh', isMetro: false },
  { prefix: '462', city: 'Bhopal', state: 'Madhya Pradesh', isMetro: false },

  // Uttar Pradesh (226xxx, 208xxx)
  { prefix: '226', city: 'Lucknow', state: 'Uttar Pradesh', isMetro: false },
  { prefix: '208', city: 'Kanpur', state: 'Uttar Pradesh', isMetro: false },
  { prefix: '221', city: 'Varanasi', state: 'Uttar Pradesh', isMetro: false },

  // Punjab & Chandigarh (160xxx, 141xxx)
  { prefix: '160', city: 'Chandigarh', state: 'Punjab / Chandigarh', isMetro: true, metroName: 'Chandigarh Tri-City' },
  { prefix: '141', city: 'Ludhiana', state: 'Punjab', isMetro: false },
  { prefix: '143', city: 'Amritsar', state: 'Punjab', isMetro: false },

  // Bihar & Jharkhand (800xxx, 834xxx)
  { prefix: '800', city: 'Patna', state: 'Bihar', isMetro: false },
  { prefix: '834', city: 'Ranchi', state: 'Jharkhand', isMetro: false },

  // Odisha (751xxx)
  { prefix: '751', city: 'Bhubaneswar', state: 'Odisha', isMetro: false },
];

/**
 * Validates whether a string is a legitimate 6-digit Indian postal code.
 */
export function isValidIndianPincode(pincode: string): boolean {
  if (!pincode || typeof pincode !== 'string') return false;
  const clean = pincode.trim();
  return /^[1-9][0-9]{5}$/.test(clean);
}

/**
 * Resolves pincode details synchronously from internal Indian postal dictionary.
 */
export function resolvePincodeSync(pincode: string): PincodeLookupResult {
  const clean = (pincode || '').trim();

  if (!isValidIndianPincode(clean)) {
    return {
      valid: false,
      pincode: clean,
      city: '',
      state: '',
      isMetro: false,
      deliveryMessage: '',
      error: 'Please enter a valid 6-digit Indian pincode.',
    };
  }

  // Check 3-digit prefix
  const prefix3 = clean.substring(0, 3);
  const matchedZone = INDIAN_PINCODE_ZONES.find((z) => z.prefix === prefix3);

  if (matchedZone) {
    const metroLabel = matchedZone.metroName || `${matchedZone.city} Metro`;
    const deliveryMessage = `Delivery Available! Estimated arrival within 2 to 3 hours in ${metroLabel}.`;

    return {
      valid: true,
      pincode: clean,
      city: matchedZone.city,
      district: matchedZone.city,
      state: matchedZone.state,
      isMetro: matchedZone.isMetro,
      deliveryMessage,
    };
  }

  // Broad state fallback based on first digit
  const firstDigit = clean[0];
  let stateFallback = 'India';
  let isMetro = false;

  switch (firstDigit) {
    case '1':
      stateFallback = 'Delhi / Northern Region';
      break;
    case '2':
      stateFallback = 'Uttar Pradesh / Uttarakhand';
      break;
    case '3':
      stateFallback = 'Rajasthan / Gujarat';
      break;
    case '4':
      stateFallback = 'Maharashtra / Madhya Pradesh';
      break;
    case '5':
      stateFallback = 'Telangana / Andhra Pradesh / Karnataka';
      break;
    case '6':
      stateFallback = 'Tamil Nadu / Kerala';
      break;
    case '7':
      stateFallback = 'West Bengal / North East';
      break;
    case '8':
      stateFallback = 'Bihar / Jharkhand';
      break;
  }

  return {
    valid: true,
    pincode: clean,
    city: stateFallback,
    state: stateFallback,
    isMetro,
    deliveryMessage: `Delivery Available! Estimated arrival within 2 to 3 hours in ${stateFallback}.`,
  };
}

/**
 * Look up pincode asynchronously, querying India Post API with quick fallback to internal dictionary.
 */
export async function lookupPincode(pincode: string): Promise<PincodeLookupResult> {
  const clean = (pincode || '').trim();

  if (!isValidIndianPincode(clean)) {
    return {
      valid: false,
      pincode: clean,
      city: '',
      state: '',
      isMetro: false,
      deliveryMessage: '',
      error: 'Please enter a valid 6-digit Indian pincode.',
    };
  }

  // Check if it's Hyderabad Metro (500xxx - 509xxx)
  const num = parseInt(clean, 10);
  if (num >= 500000 && num <= 509999) {
    return {
      valid: true,
      pincode: clean,
      city: 'Hyderabad',
      district: 'Hyderabad / Ranga Reddy',
      state: 'Telangana',
      isMetro: true,
      deliveryMessage: 'Delivery Available! Estimated arrival within 2 to 3 hours in Hyderabad Metro.',
    };
  }

  // Check if it's Bangalore Metro (560xxx - 562xxx)
  if (num >= 560000 && num <= 562999) {
    return {
      valid: true,
      pincode: clean,
      city: 'Bangalore',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      isMetro: true,
      deliveryMessage: 'Delivery Available! Estimated arrival within 2 to 3 hours in Bangalore Metro.',
    };
  }

  // Check other metros synchronously first
  const syncMatch = resolvePincodeSync(clean);
  if (syncMatch.isMetro) {
    return syncMatch;
  }

  // Attempt India Post API with 2500ms timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://api.postalpincode.in/pincode/${clean}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0].PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const district = po.District || po.Block || po.Division || syncMatch.city;
        const state = po.State || syncMatch.state;

        return {
          valid: true,
          pincode: clean,
          city: district,
          district,
          state,
          isMetro: false,
          deliveryMessage: `Delivery Available! Estimated arrival within 2 to 3 hours in ${district}.`,
        };
      }
    }
  } catch (e) {
    // Fall back to sync match if API request failed or timed out
  }

  return syncMatch;
}
