import React from 'react';
import { render } from '@testing-library/react';
import { PaginationStyled } from './styles';
import { styledRule } from '../../testUtils';

describe('PaginationStyled', () => {
  it('fills the active page with the primary color unless a button color is passed', () => {
    const { container, rerender } = render(<PaginationStyled total={50} />);
    const active = ' .rc-pagination-item-active';
    expect(styledRule(container.firstChild as Element, active)).toContain(
      'background-color:var(--ui-pagination-active)'
    );
    rerender(<PaginationStyled total={50} buttonColor="red" />);
    expect(styledRule(container.firstChild as Element, active)).toContain(
      'background-color:red'
    );
  });
});
