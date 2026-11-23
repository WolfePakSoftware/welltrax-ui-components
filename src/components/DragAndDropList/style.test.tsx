import React from 'react';
import { render } from '@testing-library/react';
import { DNDItem, StyledDivContainer } from './style';
import { styledRule } from '../../testUtils';

const tint = 'color-mix(in srgb, var(--color-primary) 10%, var(--color-card))';

describe('DragAndDropList styles', () => {
  it('tints a hovered item with the primary selection tint', () => {
    const { container } = render(<DNDItem />);
    expect(styledRule(container.firstChild as Element, ':hover')).toContain(
      `background-color:${tint}`
    );
  });

  it('gives the source list the same tint unless a color is passed', () => {
    const { container, rerender } = render(<StyledDivContainer />);
    expect(
      styledRule(container.firstChild as Element, '.sourceList')
    ).toContain(`background-color:${tint}`);
    rerender(<StyledDivContainer sourceListBackGroundColor="red" />);
    expect(
      styledRule(container.firstChild as Element, '.sourceList')
    ).toContain('background-color:red');
  });
});
