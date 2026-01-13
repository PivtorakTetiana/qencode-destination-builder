import { useState, useMemo } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  providers,
  mockBackendValidation,
  type ProviderConfig,
} from 'config/providers';

export const useProviderForm = (initialProviderId: string) => {
  const [selectedProvider, setSelectedProvider] = useState<string>(
    initialProviderId
  );
  const [destination, setDestination] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentProvider: ProviderConfig = providers[selectedProvider];

  const validationSchema = useMemo(() => {
    const { fields } = currentProvider;
    const schemaFields = fields.reduce(
      (acc, { name, yupSchema }) => ({
        ...acc,
        [name]: yupSchema,
      }),
      { provider: yup.string().required('Provider is required') }
    );
    return yup.object(schemaFields);
  }, [currentProvider]);

  const defaultValues = useMemo(() => {
    const { fields } = currentProvider;
    const fieldDefaults = fields.reduce(
      (acc, { name }) => ({
        ...acc,
        [name]: '',
      }),
      { provider: selectedProvider }
    );
    return fieldDefaults;
  }, [currentProvider, selectedProvider]);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
    setError,
    clearErrors,
    unregister,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const handleProviderChange = (newProviderId: string) => {
    if (newProviderId !== selectedProvider) {
      const oldProvider = providers[selectedProvider];
      const { fields: oldFields } = oldProvider;
      
      oldFields.forEach(({ name }) => {
        unregister(name as never);
      });

      setSelectedProvider(newProviderId);
      
      setDestination(null);

      clearErrors();

      const newProvider = providers[newProviderId];
      const { fields: newFields } = newProvider;

      const newValues: any = {
        provider: newProviderId,
      };

      newFields.forEach(({ name }) => {
        newValues[name] = '';
      });

      reset(newValues);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);

    try {
      const validationResult = await mockBackendValidation(data);

      const { success, errors: validationErrors } = validationResult;
      if (!success && validationErrors) {
        Object.entries(validationErrors).forEach(([field, message]) => {
          setError(field as any, {
            type: 'manual',
            message: message as string,
          });
        });
        setIsSubmitting(false);
        return;
      }

      const destinationData = currentProvider.buildDestination(data);
      setDestination(destinationData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    clearErrors,
    selectedProvider,
    currentProvider,
    destination,
    isSubmitting,
    isDirty,
    handleSubmit: handleSubmit(onSubmit),
    handleProviderChange,
  };
};
