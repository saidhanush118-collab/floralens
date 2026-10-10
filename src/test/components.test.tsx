import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StarRating } from '../components/common/StarRating';
import { StatusTimeline } from '../components/common/StatusTimeline';
import { AuthProvider } from '../context/AuthContext';
import { StoreProvider } from '../context/StoreContext';
import { FlowerProductCard } from '../components/cards/FlowerProductCard';
import { INITIAL_PRODUCTS } from '../lib/mockData';

describe('Bloomora UI Components', () => {
  it('renders StarRating correctly with rating number and review count', () => {
    render(<StarRating rating={4.8} reviewCount={42} />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('(42 reviews)')).toBeInTheDocument();
  });

  it('renders StatusTimeline with steps for orders', () => {
    render(
      <StatusTimeline
        type="order"
        status="preparing"
        createdAt="2026-10-10T09:00:00Z"
      />
    );
    expect(screen.getByText('Freshly Handcrafted')).toBeInTheDocument();
    expect(screen.getByText('Order Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Delivered with Love')).toBeInTheDocument();
  });

  it('renders FlowerProductCard with price in INR', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <StoreProvider>
            <FlowerProductCard product={INITIAL_PRODUCTS[0]} />
          </StoreProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(INITIAL_PRODUCTS[0].name)).toBeInTheDocument();
    // Currency symbol and price format
    expect(screen.getAllByText(/₹/).length).toBeGreaterThan(0);
  });
});
