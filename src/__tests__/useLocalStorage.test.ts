import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../06-custom-hooks/useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('returns initialValue when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('theme', 'light'));
    expect(result.current[0]).toBe('light');
  });

  it('reads existing localStorage value on init', () => {
    localStorageMock.setItem('theme', JSON.stringify('dark'));
    const { result } = renderHook(() => useLocalStorage('theme', 'light'));
    expect(result.current[0]).toBe('dark');
  });

  it('updates the stored value', () => {
    const { result } = renderHook(() => useLocalStorage('theme', 'light'));
    act(() => {
      result.current[1]('dark');
    });
    expect(result.current[0]).toBe('dark');
    expect(JSON.parse(localStorageMock.getItem('theme')!)).toBe('dark');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage<number>('count', 0));
    act(() => {
      result.current[1](prev => prev + 1);
    });
    expect(result.current[0]).toBe(1);
  });

  it('supports object values', () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ name: string }>('user', { name: 'Alice' })
    );
    act(() => {
      result.current[1]({ name: 'Bob' });
    });
    expect(result.current[0]).toEqual({ name: 'Bob' });
  });
});
