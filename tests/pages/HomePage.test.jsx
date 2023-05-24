import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { HomePage } from '../../src/components/Pages';

vi.mock('react-router-dom', () => ({
  Link: vi.fn(),
}));

describe('HomePage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with correct content and link', () => {
    Link.mockReturnValue(<a href="/blogs">START BLOGGING</a>);

    render(<HomePage />);

    const heading = screen.getByText('Blogger App');
    const subheading = screen.getByText(
      'Share Your Stories and Ideas on Our Blog'
    );
    const link = screen.getByText('START BLOGGING');

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/blogs' }),
      {}
    );
  });
});
