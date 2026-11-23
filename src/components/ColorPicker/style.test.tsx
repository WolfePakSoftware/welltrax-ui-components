import React from 'react';
import { render } from '@testing-library/react';
import { InputColor } from './style';
import { styledRule } from '../../testUtils';

describe('ColorPicker InputColor', () => {
  it('draws its border with the design system border tint', () => {
    const { container } = render(<InputColor />);
    expect(styledRule(container.firstChild as Element)).toContain(
      'border:solid 1px color-mix(in srgb, var(--color-border) 15%, var(--color-card))'
    );
  });
});
