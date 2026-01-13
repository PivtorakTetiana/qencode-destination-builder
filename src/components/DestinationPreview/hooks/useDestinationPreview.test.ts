import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDestinationPreview } from './useDestinationPreview';

describe('useDestinationPreview', () => {
  const mockDestination = {
    url: 's3://my-bucket.s3.us-east-1.amazonaws.com/media-output.mp4',
    key: 'AKIAIOSFODNN7EXAMPLE',
    secret: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  };

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize with copied as false', () => {
    const { result } = renderHook(() => useDestinationPreview(mockDestination));

    expect(result.current.copied).toBe(false);
  });

  it('should copy destination to clipboard when handleCopy is called', async () => {
    const { result } = renderHook(() => useDestinationPreview(mockDestination));

    await act(async () => {
      result.current.handleCopy();
    });

    const expectedJson = JSON.stringify({ destination: mockDestination }, null, 2);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedJson);
  });

  it('should set copied to true after copying', async () => {
    const { result } = renderHook(() => useDestinationPreview(mockDestination));

    await act(async () => {
      result.current.handleCopy();
    });

    expect(result.current.copied).toBe(true);
  });

  it('should reset copied to false after 2 seconds', async () => {
    const { result } = renderHook(() => useDestinationPreview(mockDestination));

    await act(async () => {
      result.current.handleCopy();
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  it('should not copy if destination is null', async () => {
    const { result } = renderHook(() => useDestinationPreview(null));

    await act(async () => {
      result.current.handleCopy();
    });

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });
});
