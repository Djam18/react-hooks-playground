import { renderHook, waitFor } from '@testing-library/react';
import useFetch from '../06-custom-hooks/useFetch';

interface Post {
  id: number;
  title: string;
}

// Mock fetch globally
global.fetch = jest.fn();

describe('useFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with loading=true and data=null', () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    const { result } = renderHook(() => useFetch<Post[]>('/api/posts'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('sets data on successful fetch', async () => {
    const posts: Post[] = [{ id: 1, title: 'Hello' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    const { result } = renderHook(() => useFetch<Post[]>('/api/posts'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(posts);
    expect(result.current.error).toBeNull();
  });

  it('sets error on HTTP error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch<Post[]>('/api/posts'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('HTTP 404');
    expect(result.current.data).toBeNull();
  });

  it('sets error on network failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch<Post[]>('/api/posts'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
  });

  it('refetches when url changes', async () => {
    const posts1: Post[] = [{ id: 1, title: 'Post 1' }];
    const posts2: Post[] = [{ id: 2, title: 'Post 2' }];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => posts1 })
      .mockResolvedValueOnce({ ok: true, json: async () => posts2 });

    const { result, rerender } = renderHook(
      ({ url }: { url: string }) => useFetch<Post[]>(url),
      { initialProps: { url: '/api/posts/1' } }
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(posts1);

    rerender({ url: '/api/posts/2' });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(posts2);
  });
});
