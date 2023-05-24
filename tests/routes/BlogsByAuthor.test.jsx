import React from 'react';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import BlogsByAuthor, { loader } from '../../src/routes/BlogsByAuthor';
import { getBlogsByAuthor } from '../../src/services';
import { ListView } from '../../src/routes/BlogListView';
import { Spinner } from '../../src/components/Pages';

vi.mock('react-router-dom', () => ({
  useLoaderData: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../src/services', () => ({
  getBlogsByAuthor: vi.fn(),
}));

vi.mock('../../src/routes/BlogListView', () => ({
  ListView: vi.fn(),
}));

vi.mock('../../src/components/Pages', () => ({
  Spinner: vi.fn(),
}));

describe('BlogsByAuthor component', () => {
  const mockBlogs = [
    { id: 1, title: 'Blog 1' },
    { id: 2, title: 'Blog 2' },
  ];
  const mockLoaderData = { blogs: mockBlogs };

  beforeAll(() => {
    useLoaderData.mockReturnValue(mockLoaderData);
  });

  it('renders the component with loading state', () => {
    useNavigate.mockReturnValue({ state: 'loading' });
    Spinner.mockReturnValue(<div data-testid="spinner">Loading...</div>);

    render(<BlogsByAuthor />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders the component with loaded blogs', () => {
    useNavigate.mockReturnValue({ state: 'not-loading' });
    ListView.mockReturnValue(<div data-testid="list-view">List View</div>);

    render(<BlogsByAuthor />);

    const listView = screen.getByTestId('list-view');
    expect(listView).toBeInTheDocument();
  });

  it('calls getBlogsByAuthor with the correct parameters', async () => {
    const mockAuthorId = '123';
    getBlogsByAuthor.mockResolvedValue(mockBlogs);

    await loader({
      params: { authorId: mockAuthorId },
      request: { url: 'http://localhost:3001/blogs' },
    });

    expect(getBlogsByAuthor).toHaveBeenCalledWith(mockAuthorId, 1);
  });
});
