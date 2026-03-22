import { buildApiUrl } from './apiConfig';
import type { BlogPost, PostFormValues } from './blogTypes';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorData?.message ?? 'Something went wrong while talking to the blog API.');
  }

  return (await response.json()) as T;
}

export const blogApi = {
  getPosts: async () => {
    const response = await fetch(buildApiUrl('/api/posts'));
    return handleResponse<BlogPost[]>(response);
  },
  createPost: async (payload: PostFormValues) => {
    const response = await fetch(buildApiUrl('/api/posts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<BlogPost>(response);
  },
  updatePost: async (postId: number, payload: PostFormValues) => {
    const response = await fetch(buildApiUrl(`/api/posts/${postId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<BlogPost>(response);
  },
  deletePost: async (postId: number) => {
    const response = await fetch(buildApiUrl(`/api/posts/${postId}`), {
      method: 'DELETE'
    });

    return handleResponse<BlogPost>(response);
  }
};
