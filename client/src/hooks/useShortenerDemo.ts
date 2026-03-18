import { useEffect, useState } from 'react';
import { shortenerApi } from '../shortenerApi';
import type { ShortLink, ShortenValues } from '../shortenerTypes';

export function useShortenerDemo() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [selectedLink, setSelectedLink] = useState<ShortLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadLinks = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await shortenerApi.getLinks();
        setLinks(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not load shortened links.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadLinks();
  }, []);

  const createLink = async (values: ShortenValues) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const createdLink = await shortenerApi.createLink(values.originalUrl.trim());
      setLinks((currentLinks) => [createdLink, ...currentLinks.filter((link) => link.id !== createdLink.id)]);
      setSelectedLink(createdLink);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not create a shortened link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectLink = async (linkId: string) => {
    setErrorMessage('');

    try {
      const response = await shortenerApi.getLinkDetails(linkId);
      setSelectedLink(response);
      setLinks((currentLinks) => currentLinks.map((link) => (link.id === response.id ? response : link)));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not load link analytics.');
    }
  };

  const copyLink = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch {
      setErrorMessage('Could not copy the shortened URL.');
    }
  };

  return {
    links,
    selectedLink,
    isLoading,
    isSubmitting,
    errorMessage,
    createLink,
    selectLink,
    copyLink
  };
}
