import React from 'react';
import { render } from '@testing-library/react';
import { OrgChartContainer } from './styles';
import { styledRule } from '../../testUtils';

describe('OrgChartContainer', () => {
  it('draws the lines in muted foreground unless a line color is passed', () => {
    const { container, rerender } = render(<OrgChartContainer />);
    const downLine = ' .orgchart .lines .downLine';
    expect(styledRule(container.firstChild as Element, downLine)).toContain(
      'background-color:var(--ui-text-subtle-primary)'
    );
    rerender(<OrgChartContainer lineColor="red" />);
    expect(styledRule(container.firstChild as Element, downLine)).toContain(
      'background-color:red'
    );
  });
});
