import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProviderForm from './ProviderForm';

describe('ProviderForm', () => {
  it('should render the form with title', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    expect(screen.getByText('Third-Party Storage')).toBeInTheDocument();
  });

  it('should render provider selector', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Choose Provider')).toBeInTheDocument();
  });

  it('should render AWS fields when AWS is selected', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Bucket Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Region Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Access Key ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Secret Access Key')).toBeInTheDocument();
  });

  it('should render GCP fields when GCP is selected', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="gcp" onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Bucket Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Access Key ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Secret Access Key')).toBeInTheDocument();
    
    // GCP should not have Region field
    expect(screen.queryByLabelText('Region Name')).not.toBeInTheDocument();
  });

  it('should render Cancel and Save buttons', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('should call onCancel when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should have Save button disabled initially (not dirty)', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it('should not render DestinationPreview initially', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    expect(screen.queryByText('Generated Configuration')).not.toBeInTheDocument();
  });

  it('should render form fields inside a form element', () => {
    const mockOnCancel = vi.fn();
    const { container } = render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('should render password field with visibility toggle', () => {
    const mockOnCancel = vi.fn();
    render(<ProviderForm initialProviderId="aws" onCancel={mockOnCancel} />);

    const secretField = screen.getByLabelText('Secret Access Key');
    expect(secretField).toBeInTheDocument();

    // Should have visibility toggle button
    const toggleButtons = screen.getAllByRole('button', { name: /toggle password visibility/i });
    expect(toggleButtons.length).toBeGreaterThan(0);
  });
});
