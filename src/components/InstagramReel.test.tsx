import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { InstagramReel } from './InstagramReel';

function renderReel() {
  render(
    <InstagramReel
      url="https://www.instagram.com/reel/DMYesrHNMyL"
      name="Triple Truchet Tile"
    />,
  );
  return screen.getByTitle(
    'Triple Truchet Tile - Instagram reel',
  ) as HTMLIFrameElement;
}

describe('InstagramReel', () => {
  it("uses Instagram's reported height and disables internal scrolling", () => {
    const frame = renderReel();
    expect(frame).toHaveAttribute('scrolling', 'no');
    fireEvent(
      window,
      new MessageEvent('message', {
        origin: 'https://www.instagram.com',
        source: frame.contentWindow,
        data: JSON.stringify({ type: 'MEASURE', details: { height: 1120.5 } }),
      }),
    );
    expect(frame).toHaveAttribute('height', '1121');
  });

  it('ignores messages from another origin or frame', () => {
    const frame = renderReel();
    const data = JSON.stringify({ type: 'MEASURE', details: { height: 1100 } });
    fireEvent(
      window,
      new MessageEvent('message', {
        origin: 'https://example.com',
        source: frame.contentWindow,
        data,
      }),
    );
    fireEvent(
      window,
      new MessageEvent('message', {
        origin: 'https://www.instagram.com',
        source: window,
        data,
      }),
    );
    expect(frame).toHaveAttribute('height', '700');
  });

  it('ignores malformed messages and invalid dimensions', () => {
    const frame = renderReel();
    for (const data of [
      'not JSON',
      'null',
      JSON.stringify({ type: 'LOADING' }),
      ...[0, -1, 10001, '1100'].map((height) =>
        JSON.stringify({ type: 'MEASURE', details: { height } }),
      ),
    ]) {
      fireEvent(
        window,
        new MessageEvent('message', {
          origin: 'https://www.instagram.com',
          source: frame.contentWindow,
          data,
        }),
      );
    }
    expect(frame).toHaveAttribute('height', '700');
  });
});
