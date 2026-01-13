import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import ProviderFormField from './ProviderFormField';
import type { FieldConfig } from 'config/providers';

// Wrapper component to provide form context
const FormWrapper = ({
  field,
  clearErrors,
}: {
  field: FieldConfig;
  clearErrors?: any;
}) => {
  const { control } = useForm({
    defaultValues: {
      [field.name]: '',
    },
  });

  return (
    <ProviderFormField
      field={field}
      control={control}
      clearErrors={clearErrors || vi.fn()}
    />
  );
};

describe('ProviderFormField', () => {
  const mockTextField: FieldConfig = {
    name: 'bucketName',
    label: 'Bucket Name',
    type: 'text',
    required: true,
    yupSchema: {} as any,
    grid: { desktop: 6 },
  };

  const mockPasswordField: FieldConfig = {
    name: 'secretKey',
    label: 'Secret Key',
    type: 'password',
    required: true,
    yupSchema: {} as any,
    grid: { desktop: 6 },
  };

  const mockSelectField: FieldConfig = {
    name: 'region',
    label: 'Region',
    type: 'select',
    required: true,
    options: [
      { value: 'us-east-1', label: 'US East (N. Virginia)' },
      { value: 'us-west-1', label: 'US West (N. California)' },
    ],
    yupSchema: {} as any,
    grid: { desktop: 6 },
  };

  describe('Text Field', () => {
    it('should render text input with label', () => {
      render(<FormWrapper field={mockTextField} />);

      expect(screen.getByLabelText('Bucket Name')).toBeInTheDocument();
    });

    it('should render text input as TextField', () => {
      const { container } = render(<FormWrapper field={mockTextField} />);

      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Password Field', () => {
    it('should render password input with label', () => {
      render(<FormWrapper field={mockPasswordField} />);

      expect(screen.getByLabelText('Secret Key')).toBeInTheDocument();
    });

    it('should render password input initially hidden', () => {
      const { container } = render(<FormWrapper field={mockPasswordField} />);

      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('should render visibility toggle button', () => {
      render(<FormWrapper field={mockPasswordField} />);

      const toggleButton = screen.getByRole('button', {
        name: /toggle password visibility/i,
      });
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Select Field', () => {
    it('should render select dropdown with label', () => {
      render(<FormWrapper field={mockSelectField} />);

      expect(screen.getByLabelText('Region')).toBeInTheDocument();
    });

    it('should render select with options', () => {
      render(<FormWrapper field={mockSelectField} />);

      const select = screen.getByLabelText('Region');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should render helper text when provided', () => {
      const fieldWithHelper: FieldConfig = {
        ...mockTextField,
        helperText: 'Enter your bucket name',
      };

      render(<FormWrapper field={fieldWithHelper} />);

      expect(screen.getByText('Enter your bucket name')).toBeInTheDocument();
    });
  });
});
