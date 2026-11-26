import React from 'react';
import { render } from '@testing-library/react';
import { IconDate, StyledMaskInput } from './style';
import { styledRule } from '../../../testUtils';

describe('Form input styles', () => {
  it('fills the date icon with the muted surface by default', () => {
    const { container } = render(<IconDate />);
    expect(styledRule(container.firstChild as Element)).toContain(
      'background-color:var(--ui-muted-neutral-medium)'
    );
  });

  it('fills a disabled masked input with the disabled fill, else the card', () => {
    const { container, rerender } = render(
      <StyledMaskInput mask={[/\d/]} disabled />
    );
    expect(styledRule(container.firstChild as Element)).toContain(
      'background:var(--ui-fill-disabled)'
    );
    rerender(<StyledMaskInput mask={[/\d/]} />);
    expect(styledRule(container.firstChild as Element)).toContain(
      'background:var(--ui-active-foreground)'
    );
  });
});
