import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StellarPay brand', () => {
  render(<App />);
  const brandElement = screen.getAllByText(/StellarPay/i);
  expect(brandElement.length).toBeGreaterThan(0);
});

