import { useEffect, useMemo, useState } from 'react';
import { linkApi } from '../lib/linkApi';
import type { LinkItem, ShortenFormValues } from '../types/link';

export function useUrlShortener() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadLinks = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await linkApi.getLinks();
        setLinks(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not load links.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadLinks();
  }, []);

  const stats = useMemo(() => {
    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);
    const activeLinks = links.filter((link) => !link.expiresAt || new Date(link.expiresAt).getTime() > Date.now()).length;

    return { totalLinks, totalClicks, activeLinks };
  }, [links]);

  const createShortLink = async (values: ShortenFormValues) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const createdLink = await linkApi.shortenUrl({
        originalUrl: values.originalUrl.trim(),
        expiresAt: values.expiresAt ? values.expiresAt : null
      });

      setLinks((currentLinks) => [createdLink, ...currentLinks.filter((link) => link.id !== createdLink.id)]);
      setSelectedLink(createdLink);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not shorten this URL.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectLink = async (linkId: string) => {
    setErrorMessage('');

    try {
      const linkDetails = await linkApi.getLinkDetails(linkId);
      setSelectedLink(linkDetails);
      setLinks((currentLinks) => currentLinks.map((link) => (link.id === linkDetails.id ? linkDetails : link)));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not load link analytics.');
    }
  };

  const copyShortLink = async (linkUrl: string) => {
    try {
      await navigator.clipboard.writeText(linkUrl);
    } catch {
      setErrorMessage('Could not copy the shortened URL to the clipboard.');
    }
  };

  return {
    links,
    selectedLink,
    isLoading,
    isSubmitting,
    errorMessage,
    stats,
    createShortLink,
    selectLink,
    copyShortLink
  };
}
