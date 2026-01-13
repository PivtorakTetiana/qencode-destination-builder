import { useState } from 'react';
import { useController, type Control, type UseFormClearErrors } from 'react-hook-form';
import type { FieldConfig } from 'config/providers';

export const useProviderFormField = (
  field: FieldConfig,
  control: Control<any>,
  clearErrors: UseFormClearErrors<any>
) => {
  const { name, grid, type } = field;
  const [showPassword, setShowPassword] = useState(false);

  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e: any) => {
    if (error) {
      clearErrors(name);
    }
    controllerField.onChange(e);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === 'password' && !showPassword ? 'password' : 'text';

  return {
    controllerField: {
      ...controllerField,
      onChange: handleChange,
    },
    error,
    showPassword,
    gridSize: grid.desktop,
    inputType,
    handleTogglePasswordVisibility,
  };
};
