import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProviderList } from './useProviderList';

describe('useProviderList', () => {
  it('should return provider list', () => {
    const { result } = renderHook(() => useProviderList());

    expect(result.current.providerList).toBeDefined();
    expect(Array.isArray(result.current.providerList)).toBe(true);
    expect(result.current.providerList.length).toBeGreaterThan(0);
  });

  it('should include AWS and GCP providers', () => {
    const { result } = renderHook(() => useProviderList());

    const providerIds = result.current.providerList.map((p) => p.id);
    expect(providerIds).toContain('aws');
    expect(providerIds).toContain('gcp');
  });

  it('should return providers with correct structure', () => {
    const { result } = renderHook(() => useProviderList());

    result.current.providerList.forEach((provider) => {
      expect(provider).toHaveProperty('id');
      expect(provider).toHaveProperty('name');
      expect(provider).toHaveProperty('icon');
      expect(provider).toHaveProperty('fields');
      expect(provider).toHaveProperty('buildDestination');
    });
  });
});
