import React from 'react';
import { render, screen } from '@testing-library/react';
import StepsUpperBarNode from './StepsUpperBarNode';
import { styledRule } from '../../../../testUtils';

const step = { title: 'Info', description: '', index: 2, currentStep: 2 };

describe('StepsUpperBarNode', () => {
  it('shows the active step text in its own color on a primary circle', () => {
    render(<StepsUpperBarNode {...step} isActive />);
    expect(
      styledRule(screen.getByText('Info').parentElement!.parentElement!)
    ).toContain('color:var(--ui-steps-active-text)');
    expect(styledRule(screen.getByText('2'))).toContain(
      'background-color:var(--ui-steps-active)'
    );
  });

  it('shows a pending step in muted foreground', () => {
    render(<StepsUpperBarNode {...step} />);
    expect(styledRule(screen.getByText('2'))).toContain(
      'border-color:var(--ui-muted-foreground-text-medium)'
    );
  });
});
