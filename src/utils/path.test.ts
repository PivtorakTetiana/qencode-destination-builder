import { describe, it, expect } from 'vitest';
import { normalizePath } from './path';

describe('normalizePath', () => {
  it('should remove leading slashes', () => {
    expect(normalizePath('/path/to/file')).toBe('path/to/file');
    expect(normalizePath('//path/to/file')).toBe('path/to/file');
    expect(normalizePath('///path/to/file')).toBe('path/to/file');
  });

  it('should remove trailing slashes', () => {
    expect(normalizePath('path/to/file/')).toBe('path/to/file');
    expect(normalizePath('path/to/file//')).toBe('path/to/file');
    expect(normalizePath('path/to/file///')).toBe('path/to/file');
  });

  it('should remove both leading and trailing slashes', () => {
    expect(normalizePath('/path/to/file/')).toBe('path/to/file');
    expect(normalizePath('//path/to/file//')).toBe('path/to/file');
  });

  it('should handle paths without slashes', () => {
    expect(normalizePath('file.txt')).toBe('file.txt');
    expect(normalizePath('folder')).toBe('folder');
  });

  it('should handle empty strings', () => {
    expect(normalizePath('')).toBe('');
  });

  it('should handle only slashes', () => {
    expect(normalizePath('/')).toBe('');
    expect(normalizePath('//')).toBe('');
  });

  it('should trim whitespace', () => {
    expect(normalizePath('  /path/to/file/  ')).toBe('path/to/file');
    expect(normalizePath('\t/path/to/file/\t')).toBe('path/to/file');
  });

  it('should handle undefined by using default empty string', () => {
    expect(normalizePath(undefined)).toBe('');
  });
});
