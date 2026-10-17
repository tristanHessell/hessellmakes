import { expect } from 'vitest';
import axe from 'axe-core';

/**
 * Runs axe-core against a rendered container and asserts there are no
 * violations. Uses axe-core directly (rather than a jest/vitest-axe wrapper)
 * since those wrappers load axe-core via Node's `createRequire`, which
 * doesn't work under Vitest's real-browser mode (see CLAUDE.md).
 */
export async function expectNoA11yViolations(container: Element) {
  const results = await axe.run(container);
  expect(results.violations, describeViolations(results.violations)).toEqual(
    [],
  );
}

function describeViolations(violations: axe.Result[]): string {
  if (violations.length === 0) {
    return '';
  }

  return violations
    .map((violation) => {
      const targets = violation.nodes
        .map((node) => node.target.join(' '))
        .join(', ');
      return `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.helpUrl})\n  affected: ${targets}`;
    })
    .join('\n');
}
