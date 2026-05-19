import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DigiAGIS hero text', async () => {
  render(<App />);
  const heroElement = await screen.findByText(/DigiAGIS/i, {}, { timeout: 5000 });
  expect(heroElement).toBeInTheDocument();
});
