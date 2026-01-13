import { describe, it, expect } from 'vitest';
import { providers, mockBackendValidation } from './providers';

describe('providers config', () => {
  describe('AWS provider', () => {
    const aws = providers.aws;

    it('should have correct basic configuration', () => {
      expect(aws.id).toBe('aws');
      expect(aws.name).toBe('AWS');
      expect(aws.icon).toBeDefined();
      expect(aws.fields).toHaveLength(4);
      expect(aws.buildDestination).toBeTypeOf('function');
    });

    it('should have correct field configurations', () => {
      const fieldNames = aws.fields.map((f) => f.name);
      expect(fieldNames).toEqual(['bucketName', 'region', 'accessKeyId', 'secretAccessKey']);

      const bucketField = aws.fields.find((f) => f.name === 'bucketName');
      expect(bucketField?.type).toBe('text');
      expect(bucketField?.required).toBe(true);
      expect(bucketField?.grid.desktop).toBe(6);

      const regionField = aws.fields.find((f) => f.name === 'region');
      expect(regionField?.type).toBe('select');
      expect(regionField?.options).toBeDefined();
      expect(regionField?.options?.length).toBeGreaterThan(0);

      const secretField = aws.fields.find((f) => f.name === 'secretAccessKey');
      expect(secretField?.type).toBe('password');
    });

    it('should build correct destination URL', () => {
      const values = {
        bucketName: 'my-bucket',
        region: 'us-east-1',
        accessKeyId: 'TEST_ACCESS_KEY_ID_12345',
        secretAccessKey: 'TEST_SECRET_ACCESS_KEY_ABCDEFGHIJKLMNOP',
      };

      const destination = aws.buildDestination(values);

      expect(destination.url).toBe('s3://my-bucket.s3.us-east-1.amazonaws.com/media-output.mp4');
      expect(destination.key).toBe('TEST_ACCESS_KEY_ID_12345');
      expect(destination.secret).toBe('TEST_SECRET_ACCESS_KEY_ABCDEFGHIJKLMNOP');
    });
  });

  describe('GCP provider', () => {
    const gcp = providers.gcp;

    it('should have correct basic configuration', () => {
      expect(gcp.id).toBe('gcp');
      expect(gcp.name).toBe('Google Cloud');
      expect(gcp.icon).toBeDefined();
      expect(gcp.fields).toHaveLength(3);
      expect(gcp.buildDestination).toBeTypeOf('function');
    });

    it('should have correct field configurations', () => {
      const fieldNames = gcp.fields.map((f) => f.name);
      expect(fieldNames).toEqual(['bucketName', 'accessKeyId', 'secretAccessKey']);

      const bucketField = gcp.fields.find((f) => f.name === 'bucketName');
      expect(bucketField?.grid.desktop).toBe(12); // GCP bucket is full width
    });

    it('should build correct destination URL', () => {
      const values = {
        bucketName: 'my-gcs-bucket',
        accessKeyId: 'TEST_GCS_ACCESS_KEY_ID_67890',
        secretAccessKey: 'TEST_GCS_SECRET_KEY_ZYXWVUTSRQPONMLKJI',
      };

      const destination = gcp.buildDestination(values);

      expect(destination.url).toBe('gs://my-gcs-bucket/media-output.mp4');
      expect(destination.key).toBe('TEST_GCS_ACCESS_KEY_ID_67890');
      expect(destination.secret).toBe('TEST_GCS_SECRET_KEY_ZYXWVUTSRQPONMLKJI');
    });
  });
});

describe('mockBackendValidation', () => {
  it('should return success for valid bucket name', async () => {
    const result = await mockBackendValidation({
      bucketName: 'valid-ucket-nme',
    });

    expect(result.success).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should return error when bucket name contains "b"', async () => {
    const result = await mockBackendValidation({
      bucketName: 'my-bucket',
    });

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.bucketName).toBe(
      'Bucket name cannot contain the letter "b" (backend validation)'
    );
  });

  it('should return error when bucket name contains "error"', async () => {
    const result = await mockBackendValidation({
      bucketName: 'my-error-bucket',
    });

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.bucketName).toBe(
      'Bucket name cannot contain "error" (backend validation)'
    );
  });

  it('should return error when bucket name contains "ERROR" (case insensitive)', async () => {
    const result = await mockBackendValidation({
      bucketName: 'my-ERROR-bucket',
    });

    expect(result.success).toBe(false);
    expect(result.errors?.bucketName).toBe(
      'Bucket name cannot contain "error" (backend validation)'
    );
  });

  it('should simulate async behavior with delay', async () => {
    const startTime = Date.now();
    await mockBackendValidation({ bucketName: 'valid' });
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(500);
  });
});
