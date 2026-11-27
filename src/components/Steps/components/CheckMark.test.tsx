import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckMark from './CheckMark';
import { styledRule } from '../../../testUtils';

describe('CheckMark', () => {
  it('draws the mark in the primary color', () => {
    render(<CheckMark />);
    expect(styledRule(screen.getByText('L'))).toContain(
      'color:var(--ui-steps-active)'
    );
  });
});
