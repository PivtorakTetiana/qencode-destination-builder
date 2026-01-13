import * as yup from 'yup';
import { normalizePath } from 'utils/path';
import { AWSIcon, GoogleCloudIcon } from 'assets/icons';

export type FieldType = 'text' | 'password' | 'select';

export type FieldOption = {
  value: string;
  label: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: FieldOption[];
  yupSchema: yup.AnySchema;
  grid: {
    desktop: 6 | 12;
  };
  helperText?: string;
};

export type ProviderConfig = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  fields: FieldConfig[];
  buildDestination: (values: Record<string, any>) => {
    url: string;
    key: string;
    secret: string;
  };
};

const awsRegions: FieldOption[] = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-east-2', label: 'US East (Ohio)' },
  { value: 'us-west-1', label: 'US West (N. California)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'eu-west-1', label: 'EU (Ireland)' },
  { value: 'eu-central-1', label: 'EU (Frankfurt)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
];

export const providers: Record<string, ProviderConfig> = {
  aws: {
    id: 'aws',
    name: 'AWS',
    icon: AWSIcon,
    fields: [
      {
        name: 'bucketName',
        label: 'Bucket Name',
        type: 'text',
        required: true,
        yupSchema: yup
          .string()
          .required('Bucket name is required')
          .min(3, 'Bucket name must be at least 3 characters')
          .max(63, 'Bucket name must be at most 63 characters')
          .matches(
            /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/,
            'Bucket name must start and end with a lowercase letter or number'
          )
          .test(
            'no-letter-a',
            'Bucket name cannot contain the letter "a" (frontend validation)',
            (value) => !value?.includes('a')
          ),
        grid: { desktop: 6 },
      },
      {
        name: 'region',
        label: 'Region Name',
        type: 'select',
        required: true,
        options: awsRegions,
        yupSchema: yup.string().required('Region is required'),
        grid: { desktop: 6 },
      },
      {
        name: 'accessKeyId',
        label: 'Access Key ID',
        type: 'text',
        required: true,
        yupSchema: yup
          .string()
          .required('Access Key ID is required')
          .min(16, 'Access Key ID must be at least 16 characters'),
        grid: { desktop: 6 },
      },
      {
        name: 'secretAccessKey',
        label: 'Secret Access Key',
        type: 'password',
        required: true,
        yupSchema: yup
          .string()
          .required('Secret Access Key is required')
          .min(20, 'Secret Access Key must be at least 20 characters'),
        grid: { desktop: 6 },
      },
    ],
    buildDestination: (values) => {
      const { bucketName, region, accessKeyId, secretAccessKey } = values;
      const defaultPath = 'media-output.mp4';
      const normalizedPath = normalizePath(defaultPath);
      const url = `s3://${bucketName}.s3.${region}.amazonaws.com${normalizedPath ? `/${normalizedPath}` : ''}`;
      
      return {
        url,
        key: accessKeyId,
        secret: secretAccessKey,
      };
    },
  },
  gcp: {
    id: 'gcp',
    name: 'Google Cloud',
    icon: GoogleCloudIcon,
    fields: [
      {
        name: 'bucketName',
        label: 'Bucket Name',
        type: 'text',
        required: true,
        yupSchema: yup
          .string()
          .required('Bucket name is required')
          .min(3, 'Bucket name must be at least 3 characters')
          .max(63, 'Bucket name must be at most 63 characters')
          .test(
            'no-letter-a',
            'Bucket name cannot contain the letter "a" (frontend validation)',
            (value) => !value?.includes('a')
          ),
        grid: { desktop: 12 },
      },
      {
        name: 'accessKeyId',
        label: 'Access Key ID',
        type: 'text',
        required: true,
        yupSchema: yup
          .string()
          .required('Access Key ID is required')
          .min(16, 'Access Key ID must be at least 16 characters'),
        grid: { desktop: 6 },
      },
      {
        name: 'secretAccessKey',
        label: 'Secret Access Key',
        type: 'password',
        required: true,
        yupSchema: yup
          .string()
          .required('Secret Access Key is required')
          .min(20, 'Secret Access Key must be at least 20 characters'),
        grid: { desktop: 6 },
      },
    ],
    buildDestination: (values) => {
      const { bucketName, accessKeyId, secretAccessKey } = values;
      const defaultPath = 'media-output.mp4';
      const normalizedPath = normalizePath(defaultPath);
      const url = `gs://${bucketName}${normalizedPath ? `/${normalizedPath}` : ''}`;
      
      return {
        url,
        key: accessKeyId,
        secret: secretAccessKey,
      };
    },
  },
};

export const mockBackendValidation = async (
  values: Record<string, any>
): Promise<{ success: boolean; errors?: Record<string, string> }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { bucketName } = values;
  const errors: Record<string, string> = {};

  if (bucketName?.includes('b')) {
    errors.bucketName =
      'Bucket name cannot contain the letter "b" (backend validation)';
  }

  if (bucketName?.toLowerCase().includes('error')) {
    errors.bucketName = 'Bucket name cannot contain "error" (backend validation)';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true };
};
