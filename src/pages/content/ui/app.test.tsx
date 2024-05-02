import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@pages/content/ui/app';
import useStorage from '@root/src/shared/hooks/useStorage';

describe('appTest', () => {
  vi.mock('useStorage');
  test('render app', () => {
    // given
    const text = 'works +';
    const mockObj = {
      content: 'works',
      id: 0,
      colorScheme: 'dark',
    };
    vi.mocked(useStorage).mockImplementation(() => mockObj);

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
