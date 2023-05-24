import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { redirect, useLoaderData } from 'react-router-dom';
import EditBlog, { action } from '../../src/routes/EditBlog';
import { updateBlog } from '../../src/services';
import { getAuthUsername } from '../../src/utils/jwt';
import validateFormData from '../../src/utils/inputValidation';
import { BlogForm } from '../../src/includes/components';

vi.mock('react-router-dom', () => ({
  redirect: vi.fn(),
  useLoaderData: vi.fn(),
}));

vi.mock('../../src/services', () => ({
  updateBlog: vi.fn(),
}));

vi.mock('../../src/utils/jwt', () => ({
  getAuthUsername: vi.fn(),
}));

vi.mock('../../src/utils/inputValidation');

vi.mock('../../src/includes/components', () => ({
  BlogForm: vi.fn(),
}));

describe('EditBlog component', () => {
  const mockBlog = {
    id: '123',
    title: 'Test Blog',
    description: 'Lorem ipsum dolor sit amet',
    author: 'user1',
  };
  const mockFormData = new FormData();
  mockFormData.append('title', 'Test Blog');
  mockFormData.append('description', 'Lorem ipsum dolor sit amet');
  const mockLoaderData = { blog: mockBlog };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with BlogForm if the authenticated user is the blog author', () => {
    useLoaderData.mockReturnValue(mockLoaderData);
    getAuthUsername.mockReturnValue('user1');
    BlogForm.mockReturnValue(<div data-testid="blog-form">Blog Form</div>);

    render(<EditBlog />);

    const blogForm = screen.getByTestId('blog-form');
    expect(blogForm).toBeInTheDocument();
  });

  it('renders a message if the authenticated user is not the blog author', () => {
    validateFormData.mockReturnValueOnce({});
    useLoaderData.mockReturnValue(mockLoaderData);
    getAuthUsername.mockReturnValue('user2');

    render(<EditBlog />);

    const message = screen.getByText('You have no access to edit the blog');
    expect(message).toBeInTheDocument();
  });

  it('calls updateBlog and redirects on successful action', async () => {
    validateFormData.mockReturnValueOnce({});
    useLoaderData.mockReturnValue(mockLoaderData);
    getAuthUsername.mockReturnValue('user1');
    const mockResponse = { status: 'UPDATE_SUCCESS', payload: mockBlog };
    updateBlog.mockResolvedValue(mockResponse);
    redirect.mockReturnValue(null);

    const mockRequest = { formData: () => Promise.resolve(new FormData()) };
    const mockParams = { blogId: '123' };

    await act(async () => {
      await action({ request: mockRequest, params: mockParams });
    });

    expect(updateBlog).toHaveBeenCalledWith('123', {});
    expect(redirect).toHaveBeenCalledWith('/blogs/123');
  });

  //   it('returns validation errors when input validation fails in action', async () => {
  //     useLoaderData.mockReturnValue(mockLoaderData);
  //     getAuthUsername.mockReturnValue('user1');
  //     const mockErrors = { title: 'Title is required' };
  //     validateFormData.mockReturnValue(mockErrors);
  //     redirect.mockReturnValue(null);

  //     const mockRequest = { formData: () => Promise.resolve(mockFormData) };
  //     const mockParams = { blogId: '123' };

  //     const result = await action({ request: mockRequest, params: mockParams });

  //     expect(updateBlog).not.toHaveBeenCalled();
  //     expect(redirect).not.toHaveBeenCalled();
  //     expect(result).toEqual(mockErrors);
  //   });
});
