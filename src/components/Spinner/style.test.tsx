import React from 'react';
import { render } from '@testing-library/react';
import { SpinnerContainer } from './style';
import { styledRule } from '../../testUtils';

describe('SpinnerContainer', () => {
  it('tints the backdrop only when it has one', () => {
    const { container, rerender } = render(<SpinnerContainer hasBackdrop />);
    expect(styledRule(container.firstChild as Element)).toContain(
      'background-color:var(--ui-skeleton)'
    );
    rerender(<SpinnerContainer />);
    expect(styledRule(container.firstChild as Element)).not.toContain(
      '--ui-skeleton'
    );
  });
});
