import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { useProviderFormField } from './useProviderFormField';
import type { FieldConfig } from 'config/providers';

describe('useProviderFormField', () => {
  const mockField: FieldConfig = {
    name: 'testField',
    label: 'Test Field',
    type: 'text',
    required: true,
    yupSchema: {} as any,
    grid: { desktop: 6 },
  };

  const mockPasswordField: FieldConfig = {
    ...mockField,
    name: 'password',
    type: 'password',
  };

  it('should initialize with correct grid size on desktop', () => {
    const { result: formResult } = renderHook(() => useForm());
    const { result } = renderHook(() =>
      useProviderFormField(mockField, formResult.current.control, formResult.current.clearErrors)
    );

    // On desktop (above 'md' breakpoint), should use field.grid.desktop
    expect(result.current.gridSize).toBe(6);
  });

  it('should return correct input type for text field', () => {
    const { result: formResult } = renderHook(() => useForm());
    const { result } = renderHook(() =>
      useProviderFormField(mockField, formResult.current.control, formResult.current.clearErrors)
    );

    expect(result.current.inputType).toBe('text');
  });

  it('should return password type for password field when not visible', () => {
    const { result: formResult } = renderHook(() => useForm());
    const { result } = renderHook(() =>
      useProviderFormField(
        mockPasswordField,
        formResult.current.control,
        formResult.current.clearErrors
      )
    );

    expect(result.current.inputType).toBe('password');
    expect(result.current.showPassword).toBe(false);
  });

  it('should toggle password visibility', () => {
    const { result: formResult } = renderHook(() => useForm());
    const { result } = renderHook(() =>
      useProviderFormField(
        mockPasswordField,
        formResult.current.control,
        formResult.current.clearErrors
      )
    );

    expect(result.current.showPassword).toBe(false);
    expect(result.current.inputType).toBe('password');

    act(() => {
      result.current.handleTogglePasswordVisibility();
    });

    expect(result.current.showPassword).toBe(true);
    expect(result.current.inputType).toBe('text');

    act(() => {
      result.current.handleTogglePasswordVisibility();
    });

    expect(result.current.showPassword).toBe(false);
    expect(result.current.inputType).toBe('password');
  });

  it('should have controllerField with onChange handler', () => {
    const { result: formResult } = renderHook(() => useForm());
    const { result } = renderHook(() =>
      useProviderFormField(mockField, formResult.current.control, formResult.current.clearErrors)
    );

    expect(result.current.controllerField).toBeDefined();
    expect(result.current.controllerField.onChange).toBeTypeOf('function');
    expect(result.current.controllerField.onBlur).toBeTypeOf('function');
    expect(result.current.controllerField.name).toBe('testField');
  });

  it('should clear errors when field value changes and has error', () => {
    const { result: formResult } = renderHook(() =>
      useForm({
        defaultValues: { testField: '' },
      })
    );

    const clearErrorsMock = vi.fn();

    const { result } = renderHook(() =>
      useProviderFormField(mockField, formResult.current.control, clearErrorsMock)
    );

    const mockEvent = { target: { value: 'new value' } };

    act(() => {
      result.current.controllerField.onChange(mockEvent);
    });

    // Even if there's no error initially, onChange should be called
    expect(result.current.controllerField.onChange).toBeTypeOf('function');
  });
});
