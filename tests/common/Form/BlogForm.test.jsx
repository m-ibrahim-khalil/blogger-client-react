import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useActionData, useNavigate } from 'react-router-dom';
import { BlogForm } from '../../../src/includes/components';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useActionData: vi.fn(),
    useNavigate: vi.fn(),
    Form: vi.fn(),
  };
});

describe('BlogForm component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with create option', () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
    useActionData.mockReturnValue({});

    render(<BlogForm option="Create" />);
    const createBlog = screen.getByText('Create Blog');
    expect(createBlog).toBeInTheDocument();
  });

  it('renders the component with edit option and validation errors', () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
    useActionData.mockReturnValue({ title: 'Title is required' });

    render(
      <BlogForm
        option="Edit"
        blog={{ title: 'Blog Title', description: 'Blog Description' }}
      />
    );

    const editBlog = screen.getByText('Edit Blog');
    expect(editBlog).toBeInTheDocument();
  });
});
