import type { Control, FieldError, UseFormClearErrors } from 'react-hook-form';
import type { FieldConfig } from 'config/providers';

export type ProviderFormFieldProps = {
  field: FieldConfig;
  control: Control<any>;
  clearErrors: UseFormClearErrors<any>;
  error?: FieldError;
};
