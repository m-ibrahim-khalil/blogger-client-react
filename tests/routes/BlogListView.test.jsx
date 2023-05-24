import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import BlogListView, { ListView } from '../../src/routes/BlogListView';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useSearchParams: vi
      .fn()
      .mockReturnValue([{ page: 1, get: () => this.page }]),
    useNavigate: vi.fn(),
    useLoaderData: vi.fn(),
  };
});

vi.mock('../../src/includes/components', () => ({
  BlogListCard: vi.fn(),
  Spinner: vi.fn(),
}));

const mockBlogs = [
  { id: 1, title: 'Blog 1' },
  { id: 2, title: 'Blog 2' },
];

describe('ListView component', () => {
  it('renders the component with no blogs', () => {
    render(<ListView items={{ payload: [], totalPages: 1 }} />);
    const noBlogText = screen.getByText('No Blog Found');
    expect(noBlogText).toBeInTheDocument();
  });

  it('renders the component with blogs', () => {
    render(<ListView items={{ payload: mockBlogs, totalPages: 1 }} />);

    const blogListText = screen.getByText('Blog List');
    expect(blogListText).toBeInTheDocument();
  });

  it('calls navigate when pagination is changed', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(<ListView items={{ payload: mockBlogs, totalPages: 5 }} />);
    const paginationButton = screen.getByRole('button', {
      name: 'Go to page 4',
    });
    fireEvent.click(paginationButton);
    expect(mockNavigate).toHaveBeenCalledWith('/blogs/?page=4');
  });
});

describe('BlogListView component', () => {
  it('renders the component with loaded blogs', () => {
    useLoaderData.mockReturnValue({
      blogs: { payload: mockBlogs, totalPages: 1 },
    });
    useNavigate.mockReturnValue({ state: 'not-loading' });
    render(<BlogListView />);
    const blogCard = screen.getByText('Blog List');
    expect(blogCard).toBeInTheDocument();
  });
});
