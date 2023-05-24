import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';
import { AuthProvider } from '../src/context/authContext';

describe('App Component', () => {
  it('renders headlines', () => {
    const { getByText, getAllByText } = render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    expect(getAllByText('Blogger App')).toBeTruthy();
    expect(
      getByText('Share Your Stories and Ideas on Our Blog')
    ).toBeInTheDocument();
  });

  it('renders starting button', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    const counter = screen.getByRole('link', { name: /START BLOGGING/i });
    expect(counter.textContent).toBe('START BLOGGING');
  });
});
