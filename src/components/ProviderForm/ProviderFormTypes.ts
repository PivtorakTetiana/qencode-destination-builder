export type ProviderFormProps = {
  initialProviderId: string;
  onCancel: () => void;
};

export type FormValues = {
  provider: string;
  [key: string]: any;
};
