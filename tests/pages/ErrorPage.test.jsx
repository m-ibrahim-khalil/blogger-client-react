import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';
import { useAuth } from '../../src/context/authContext';
import { removeCoockie } from '../../src/utils/jwt';
import { ErrorPage } from '../../src/components/Pages';

vi.mock('react-router-dom', () => ({
  useRouteError: vi.fn(),
}));

vi.mock('../../src/context/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../src/utils/jwt', () => ({
  removeCoockie: vi.fn(),
}));

describe('ErrorPage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with error information', () => {
    useRouteError.mockReturnValue({ statusText: 'Not Found' });
    useAuth.mockReturnValue({ setAuthUser: vi.fn(), setIsLoggedIn: vi.fn() });

    render(<ErrorPage />);

    const errorMessage = screen.getByText(
      'Sorry, an unexpected error has occurred.'
    );
    const errorStatus = screen.getByText('Not Found');
    expect(errorMessage).toBeInTheDocument();
    expect(errorStatus).toBeInTheDocument();
  });

  it('removes jwt cookie and clears authentication on jwt expired error', () => {
    const mockError = { message: 'jwt expired' };
    const mockSetAuthUser = vi.fn();
    const mockSetIsLoggedIn = vi.fn();
    useRouteError.mockReturnValue(mockError);
    useAuth.mockReturnValue({
      setAuthUser: mockSetAuthUser,
      setIsLoggedIn: mockSetIsLoggedIn,
    });

    render(<ErrorPage />);

    expect(mockSetAuthUser).toHaveBeenCalledWith(null);
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
    expect(removeCoockie).toHaveBeenCalledWith('jwt');
  });
});
