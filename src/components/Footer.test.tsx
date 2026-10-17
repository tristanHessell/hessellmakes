import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { expectNoA11yViolations } from '../testUtils/a11y';

describe('Footer', () => {
  it('shows the copyright notice and the social links', () => {
    render(<Footer />);

    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}.*HessellMakes`)),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /instagram/i }),
    ).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    await expectNoA11yViolations(container);
  });
});
