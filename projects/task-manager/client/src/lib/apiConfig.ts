function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const apiBaseUrl = configuredApiBaseUrl ? trimTrailingSlash(configuredApiBaseUrl) : '';

export function buildApiUrl(path: string) {
  if (!apiBaseUrl) {
    return path;
  }

  return `${apiBaseUrl}${path}`;
}
