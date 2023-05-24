import React from 'react';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { redirect, useLoaderData } from 'react-router-dom';
import BlogView, { loader, action } from '../../src/routes/BlogView';
import { getBlogById, deleteBlog } from '../../src/services';
import { BlogDetailsCard } from '../../src/includes/components';

vi.mock('react-router-dom', () => ({
  redirect: vi.fn(),
  useLoaderData: vi.fn(),
}));

vi.mock('../../src/services', () => ({
  getBlogById: vi.fn(),
  deleteBlog: vi.fn(),
}));

vi.mock('../../src/includes/components', () => ({
  BlogDetailsCard: vi.fn(),
}));

describe('BlogView component', () => {
  const mockBlog = {
    id: 1,
    title: 'Test Blog',
    content: 'Lorem ipsum dolor sit amet',
  };
  const mockLoaderData = { blog: mockBlog };

  beforeAll(() => {
    useLoaderData.mockReturnValue(mockLoaderData);
  });

  it('renders the component with blog details', () => {
    BlogDetailsCard.mockReturnValue(
      <div data-testid="blog-card">Blog Card</div>
    );

    render(<BlogView />);

    const blogCard = screen.getByTestId('blog-card');
    expect(blogCard).toBeInTheDocument();
  });

  it('calls getBlogById with the correct parameter in the loader', async () => {
    const mockBlogId = '123';
    getBlogById.mockResolvedValue(mockBlog);

    await loader({ params: { blogId: mockBlogId } });

    expect(getBlogById).toHaveBeenCalledWith(mockBlogId);
  });

  it('calls deleteBlog and redirects to /blogs in the action', async () => {
    const mockBlogId = '123';
    deleteBlog.mockResolvedValue();
    redirect.mockReturnValue(null);

    await action({ params: { blogId: mockBlogId } });

    expect(deleteBlog).toHaveBeenCalledWith(mockBlogId);
    expect(redirect).toHaveBeenCalledWith('/blogs');
  });
});
