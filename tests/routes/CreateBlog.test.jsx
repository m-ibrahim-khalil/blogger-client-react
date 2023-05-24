import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

import { redirect } from 'react-router-dom';
import CreateBlog, { action } from '../../src/routes/CreateBlog';
import { createBlog } from '../../src/services';
import { BlogForm } from '../../src/includes/components';
import validateFormData from '../../src/utils/inputValidation';

vi.mock('../../src/utils/inputValidation');

vi.mock('react-router-dom', () => ({
  redirect: vi.fn(),
}));

vi.mock('../../src/services', () => ({
  createBlog: vi.fn(),
}));

vi.mock('../../src/includes/components', () => ({
  BlogForm: vi.fn(),
}));

describe('CreateBlog component', () => {
  const mockFormData = new FormData();
  mockFormData.append('title', 'Test Blog');
  mockFormData.append('content', 'Lorem ipsum dolor sit amet');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with BlogForm', () => {
    BlogForm.mockReturnValue(<div data-testid="blog-form">Blog Form</div>);

    render(<CreateBlog />);

    const blogForm = screen.getByTestId('blog-form');
    expect(blogForm).toBeInTheDocument();
  });

  it('calls createBlog and redirects on successful action', async () => {
    const mockBlog = {
      id: '123',
      title: 'Test Blog',
      content: 'Lorem ipsum dolor sit amet',
    };
    validateFormData.mockReturnValueOnce({});
    const mockResponse = { status: 'CREATE_SUCCESS', payload: mockBlog };
    createBlog.mockResolvedValue(mockResponse);
    redirect.mockReturnValue(null);

    const mockRequest = { formData: () => Promise.resolve(mockFormData) };

    await act(async () => {
      await action({ request: mockRequest });
    });

    expect(createBlog).toHaveBeenCalledWith({
      title: 'Test Blog',
      content: 'Lorem ipsum dolor sit amet',
    });
    expect(redirect).toHaveBeenCalledWith('/blogs/123');
  });

  it('returns validation errors when input validation fails in action', async () => {
    const mockErrors = { title: 'Title is required' };
    validateFormData.mockReturnValue(mockErrors);
    redirect.mockReturnValue(null);

    const mockRequest = { formData: () => Promise.resolve(mockFormData) };

    const result = await action({ request: mockRequest });

    expect(createBlog).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
    expect(result).toEqual(mockErrors);
  });
});
