import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProviderForm } from './useProviderForm';

// Mock the backend validation
vi.mock('config/providers', async () => {
  const actual = await vi.importActual('config/providers');
  return {
    ...actual,
    mockBackendValidation: vi.fn(async (values: any) => {
      if (values.bucketName?.includes('b')) {
        return {
          success: false,
          errors: {
            bucketName: 'Bucket name cannot contain the letter "b" (backend validation)',
          },
        };
      }
      return { success: true };
    }),
  };
});

describe('useProviderForm', () => {
  it('should initialize with AWS provider', () => {
    const { result } = renderHook(() => useProviderForm('aws'));

    expect(result.current.selectedProvider).toBe('aws');
    expect(result.current.currentProvider.id).toBe('aws');
    expect(result.current.currentProvider.name).toBe('AWS');
  });

  it('should initialize with GCP provider', () => {
    const { result } = renderHook(() => useProviderForm('gcp'));

    expect(result.current.selectedProvider).toBe('gcp');
    expect(result.current.currentProvider.id).toBe('gcp');
    expect(result.current.currentProvider.name).toBe('Google Cloud');
  });

  it('should have correct initial states', () => {
    const { result } = renderHook(() => useProviderForm('aws'));

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isDirty).toBe(false);
    expect(result.current.destination).toBeNull();
  });

  it('should provide control and clearErrors from react-hook-form', () => {
    const { result } = renderHook(() => useProviderForm('aws'));

    expect(result.current.control).toBeDefined();
    expect(result.current.clearErrors).toBeTypeOf('function');
  });

  it('should provide handleSubmit function', () => {
    const { result } = renderHook(() => useProviderForm('aws'));

    expect(result.current.handleSubmit).toBeTypeOf('function');
  });

  it('should change provider and reset fields', () => {
    const { result } = renderHook(() => useProviderForm('aws'));

    expect(result.current.selectedProvider).toBe('aws');
    expect(result.current.currentProvider.fields).toHaveLength(4);

    act(() => {
      result.current.handleProviderChange('gcp');
    });

    expect(result.current.selectedProvider).toBe('gcp');
    expect(result.current.currentProvider.id).toBe('gcp');
    expect(result.current.currentProvider.fields).toHaveLength(3);
    expect(result.current.destination).toBeNull();
  });

  it('should not change provider if same provider is selected', () => {
    const { result } = renderHook(() => useProviderForm('aws'));

    const initialProvider = result.current.currentProvider;

    act(() => {
      result.current.handleProviderChange('aws');
    });

    expect(result.current.currentProvider).toBe(initialProvider);
  });

  it('should have validation schema that changes with provider', () => {
    const { result } = renderHook(({ providerId }) => useProviderForm(providerId), {
      initialProps: { providerId: 'aws' },
    });

    const awsFields = result.current.currentProvider.fields;
    expect(awsFields.some((f) => f.name === 'region')).toBe(true);

    act(() => {
      result.current.handleProviderChange('gcp');
    });

    const gcpFields = result.current.currentProvider.fields;
    expect(gcpFields.some((f) => f.name === 'region')).toBe(false);
  });
});
