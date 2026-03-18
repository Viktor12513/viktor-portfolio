import type { LinkItem } from '../types/link';

type ShortenPayload = {
  originalUrl: string;
  expiresAt?: string | null;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorData?.message ?? 'Something went wrong while talking to the API.');
  }

  return (await response.json()) as T;
}

export const linkApi = {
  getLinks: async () => {
    const response = await fetch('/api/links');
    return handleResponse<LinkItem[]>(response);
  },
  shortenUrl: async (payload: ShortenPayload) => {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<LinkItem>(response);
  },
  getLinkDetails: async (linkId: string) => {
    const response = await fetch(`/api/links/${linkId}`);
    return handleResponse<LinkItem>(response);
  }
};
