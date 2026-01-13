import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DestinationPreview from './DestinationPreview';

describe('DestinationPreview', () => {
  const mockDestination = {
    url: 's3://my-bucket.s3.us-east-1.amazonaws.com/media-output.mp4',
    key: 'AKIAIOSFODNN7EXAMPLE',
    secret: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  };

  let writeTextMock: any;

  beforeEach(() => {
    writeTextMock = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });
  });

  it('should not render when destination is null', () => {
    const { container } = render(<DestinationPreview destination={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when destination is provided', () => {
    render(<DestinationPreview destination={mockDestination} />);

    expect(screen.getByText('Generated Configuration')).toBeInTheDocument();
  });

  it('should display destination JSON in pre/code tags', () => {
    render(<DestinationPreview destination={mockDestination} />);

    const codeElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'code' && content.includes('s3://my-bucket');
    });

    expect(codeElement).toBeInTheDocument();
  });

  it('should display destination with correct structure', () => {
    const { container } = render(<DestinationPreview destination={mockDestination} />);

    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();

    const code = pre?.querySelector('code');
    const jsonText = code?.textContent || '';
    const parsedJson = JSON.parse(jsonText);

    expect(parsedJson).toHaveProperty('destination');
    expect(parsedJson.destination).toEqual(mockDestination);
  });

  it('should render copy button', () => {
    render(<DestinationPreview destination={mockDestination} />);

    const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('should change button state when copy button is clicked', async () => {
    const user = userEvent.setup();
    render(<DestinationPreview destination={mockDestination} />);

    const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
    
    // Initially should show "Copy to clipboard"
    expect(copyButton).toHaveAttribute('aria-label', 'Copy to clipboard');
    
    await user.click(copyButton);

    // After clicking, should show "Copied!"
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    });
  });

  it('should show "Copied!" tooltip after copying', async () => {
    const user = userEvent.setup();
    render(<DestinationPreview destination={mockDestination} />);

    const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
    await user.click(copyButton);

    // The button's aria-label should change to "Copied!"
    const copiedButton = await screen.findByRole('button', { name: /copied/i });
    expect(copiedButton).toBeInTheDocument();
  });
});
