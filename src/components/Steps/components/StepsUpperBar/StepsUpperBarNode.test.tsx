import React from 'react';
import { render, screen } from '@testing-library/react';
import StepsUpperBarNode from './StepsUpperBarNode';
import { styledRule } from '../../../../testUtils';

describe('StepsUpperBarNode', () => {
  it('writes the active step number in the text color for the primary circle', () => {
    render(
      <StepsUpperBarNode
        title="Info"
        description=""
        index={2}
        currentStep={2}
        isActive
      />
    );
    expect(styledRule(screen.getByText('2'))).toContain(
      'color:var(--color-primary-foreground)'
    );
  });
});
