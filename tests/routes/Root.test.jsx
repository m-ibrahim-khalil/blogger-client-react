import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Root from '../../src/routes/Root';

vi.mock('../../src/includes/components', () => {
  return {
    MenuAppBar: vi.fn(() => {
      return <div>Mocked Appbar</div>;
    }),
  };
});

describe('Root component', () => {
  it('renders appbar', () => {
    const { getByText } = render(<Root />);
    expect(getByText('Mocked Appbar', { name: /Mocked Appbar/i })).toBeTruthy();
  });

  it('renders the component', () => {
    const { container } = render(<Root />);
    expect(container).toBeInTheDocument();
  });
});
