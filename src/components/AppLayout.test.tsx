import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AppLayout } from './AppLayout';
import { ThemeProvider } from '../theme/ThemeContext';

function renderAppLayout(page: ReactNode = <p>Page content</p>) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={page} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AppLayout', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the brand name and the routed page content', () => {
    renderAppLayout();

    expect(screen.getByText('HESSELL')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('links the brand name to the home page', () => {
    renderAppLayout();

    expect(screen.getByRole('link', { name: /hessellmakes/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders the footer copyright notice', () => {
    renderAppLayout();

    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}.*HessellMakes`)),
    ).toBeInTheDocument();
  });

  it('switches theme via the toggle inside the hamburger menu', async () => {
    renderAppLayout();

    const logo = screen
      .getByRole('link', { name: /hessellmakes/i })
      .querySelector('svg');
    expect(logo).not.toBeNull();
    expect(getComputedStyle(logo!).fill).toBe('rgb(31, 48, 94)');

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    // The dropdown fades/flips visibility in via a CSS transition, so the
    // toggle isn't in the accessibility tree the instant the class changes —
    // findByRole retries until the transition has actually applied.
    fireEvent.click(
      await screen.findByRole('button', { name: /switch to dark mode/i }),
    );

    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(getComputedStyle(logo!).fill).toBe('rgb(255, 255, 255)');
  });

  it('opens the hamburger navigation menu and shows the nav links', async () => {
    renderAppLayout();

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    expect(
      await screen.findByRole('link', { name: 'Home' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Portfolio' })).toBeInTheDocument();
  });
});
