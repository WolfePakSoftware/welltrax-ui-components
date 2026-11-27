import React from 'react';
import { render } from '@testing-library/react';
import {
  ProgressLabelSegmentCenter,
  ProgressLabelSegmentFirst,
  ProgressLabelSegmentLast,
  ProgressLabelSegmentUnic
} from './style';
import { styledRule } from '../../testUtils';

const background = (element: React.ReactElement) =>
  styledRule(render(element).container.firstChild as Element);

describe('ProgresLabel segments', () => {
  it('fill done segments with success and pending ones with muted', () => {
    expect(background(<ProgressLabelSegmentFirst />)).toContain(
      'background-color:var(--ui-success-background)'
    );
    expect(background(<ProgressLabelSegmentUnic />)).toContain(
      'background-color:var(--ui-success-background)'
    );
    expect(background(<ProgressLabelSegmentCenter />)).toContain(
      'background-color:var(--ui-progress-pending)'
    );
    expect(background(<ProgressLabelSegmentLast />)).toContain(
      'background-color:var(--ui-progress-pending)'
    );
  });

  it('use a passed color instead', () => {
    expect(
      background(<ProgressLabelSegmentFirst BackgorundColor="red" />)
    ).toContain('background-color:red');
  });
});
