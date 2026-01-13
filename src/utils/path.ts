export const normalizePath = (path: string = ''): string => {
  const trimmed = path.trim();
  return trimmed.replace(/^\/+|\/+$/g, '');
};
