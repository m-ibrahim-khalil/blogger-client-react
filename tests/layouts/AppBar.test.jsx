import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuAppBar } from '../../src/includes/components';
import { useAuth } from '../../src/context/authContext';

vi.mock('react-router-dom', () => ({
  Link: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../src/context/authContext', () => ({
  useAuth: vi.fn(),
}));

describe('MenuAppBar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with guest user buttons when not logged in', () => {
    useAuth.mockReturnValue({ authUser: null, isLoggedIn: false });

    render(<MenuAppBar />);

    const logo = screen.getByText('Blogger App');
    const guestUserButton = screen.getByText('Guest User');

    expect(logo).toBeInTheDocument();
    expect(guestUserButton).toBeInTheDocument();
    expect(Link).toHaveBeenCalledTimes(2);
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/Signin' }),
      {}
    );
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/Signup' }),
      {}
    );
  });

  it('renders the component with authenticated user buttons when logged in', () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
    useAuth.mockReturnValue({ authUser: 'JohnDoe', isLoggedIn: true });

    render(<MenuAppBar />);

    const logo = screen.getByText('Blogger App');
    const createBlogButton = screen.getByText('Create Blog');
    const profileButton = screen.getByText('Hi JohnDoe');

    expect(logo).toBeInTheDocument();
    expect(createBlogButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(useNavigate).toHaveBeenCalled();
    expect(Link).not.toHaveBeenCalled();
    fireEvent.click(profileButton);
    expect(navigateMock).toHaveBeenCalledWith('/users/JohnDoe');
  });
});
