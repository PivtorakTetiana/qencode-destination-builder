import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProviderList from './ProviderList';

describe('ProviderList', () => {
  it('should render the title', () => {
    const mockOnSelect = vi.fn();
    render(<ProviderList onProviderSelect={mockOnSelect} />);

    expect(screen.getByText('THIRD PARTY STORAGE')).toBeInTheDocument();
    expect(screen.getByText('Choose Provider')).toBeInTheDocument();
  });

  it('should render AWS and GCP provider cards', () => {
    const mockOnSelect = vi.fn();
    render(<ProviderList onProviderSelect={mockOnSelect} />);

    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Google Cloud')).toBeInTheDocument();
  });

  it('should call onProviderSelect with AWS id when AWS card is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    render(<ProviderList onProviderSelect={mockOnSelect} />);

    const awsCard = screen.getByText('AWS').closest('[class*="providerCard"]');
    expect(awsCard).toBeInTheDocument();

    if (awsCard) {
      await user.click(awsCard);
      expect(mockOnSelect).toHaveBeenCalledWith('aws');
    }
  });

  it('should call onProviderSelect with GCP id when GCP card is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    render(<ProviderList onProviderSelect={mockOnSelect} />);

    const gcpCard = screen.getByText('Google Cloud').closest('[class*="providerCard"]');
    expect(gcpCard).toBeInTheDocument();

    if (gcpCard) {
      await user.click(gcpCard);
      expect(mockOnSelect).toHaveBeenCalledWith('gcp');
    }
  });

  it('should render provider icons', () => {
    const mockOnSelect = vi.fn();
    const { container } = render(<ProviderList onProviderSelect={mockOnSelect} />);

    // Check that icons are rendered (SVGs should be present)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });
});
