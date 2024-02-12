import { renderHook, act } from '@testing-library/react';
import useDebounce from '../06-custom-hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update before delay', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } }
    );

    rerender({ value: 'world' });
    jest.advanceTimersByTime(200); // not yet

    expect(result.current).toBe('hello');
  });

  it('updates after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } }
    );

    rerender({ value: 'world' });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('world');
  });

  it('resets the timer if value changes within delay', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'ab' });
    jest.advanceTimersByTime(200);
    rerender({ value: 'abc' });
    jest.advanceTimersByTime(200); // still not 300ms since 'abc'

    expect(result.current).toBe('a'); // still original

    act(() => {
      jest.advanceTimersByTime(100); // now 300ms from 'abc'
    });

    expect(result.current).toBe('abc');
  });

  it('works with numeric values via TypeScript generic', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebounce(value, 500),
      { initialProps: { value: 0 } }
    );

    rerender({ value: 42 });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(42);
  });
});
