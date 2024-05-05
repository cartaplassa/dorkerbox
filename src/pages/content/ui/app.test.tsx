import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '@pages/content/ui/app';

describe('appTest', () => {
  test('render app', () => {
    // given
    const text = 'foo bar +';

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
