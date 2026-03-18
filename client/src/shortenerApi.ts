import type { ShortLink } from './shortenerTypes';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorData?.message ?? 'Something went wrong while talking to the API.');
  }

  return (await response.json()) as T;
}

export const shortenerApi = {
  getLinks: async () => {
    const response = await fetch('/api/short-links');
    return handleResponse<ShortLink[]>(response);
  },
  createLink: async (originalUrl: string) => {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl })
    });

    return handleResponse<ShortLink>(response);
  },
  getLinkDetails: async (linkId: string) => {
    const response = await fetch(`/api/short-links/${linkId}`);
    return handleResponse<ShortLink>(response);
  }
};
