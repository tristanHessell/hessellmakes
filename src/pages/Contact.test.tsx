import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Contact } from './Contact';
import { expectNoA11yViolations } from '../testUtils/a11y';

describe('Contact', () => {
  it('renders the page heading and form fields', () => {
    render(<Contact />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Contact' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('shows a confirmation message after submitting', () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByRole('status')).toHaveTextContent(/thanks/i);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Contact />);
    await expectNoA11yViolations(container);
  });
});
