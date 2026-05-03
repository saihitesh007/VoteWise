import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useTTS, { getSpeechLang } from '../hooks/useTTS';

describe('useTTS', () => {
  beforeEach(() => {
    window.speechSynthesis.speak = vi.fn((utterance) => {
      utterance.onstart?.();
    });
    window.speechSynthesis.cancel = vi.fn();
  });

  it('returns speak, stop, isSpeaking and uses the correct language code', () => {
    const { result } = renderHook(() => useTTS());

    expect(typeof result.current.speak).toBe('function');
    expect(typeof result.current.stop).toBe('function');
    expect(typeof result.current.isSpeaking).toBe('boolean');

    act(() => {
      result.current.speak('Sample text');
    });

    const utterance = window.speechSynthesis.speak.mock.calls[0][0];
    expect(utterance.lang).toBe(getSpeechLang('en'));
  });
});
