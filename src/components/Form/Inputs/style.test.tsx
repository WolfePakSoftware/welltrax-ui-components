import React from 'react';
import { render } from '@testing-library/react';
import { DateInputContainer, IconDate, StyledMaskInput } from './style';
import { styledRule } from '../../../testUtils';

jest.mock('@blueprintjs/datetime', () => ({
  DateInput: ({ className }: { className?: string }) => (
    <div className={className} />
  )
}));

describe('Form input styles', () => {
  it('dims disabled days to half opacity', () => {
    const { container } = render(<DateInputContainer />);
    expect(
      styledRule(
        container.firstChild as Element,
        ' .DayPicker-Day.DayPicker-Day--disabled'
      )
    ).toContain('opacity:0.5');
  });

  it('tints a hovered day with the primary selection tint', () => {
    const { container } = render(<DateInputContainer />);
    expect(
      styledRule(container.firstChild as Element, ' .DayPicker-Day:hover')
    ).toContain(
      'background:color-mix(in srgb, var(--color-primary) 10%, var(--color-card)) !important'
    );
  });

  it('fills the date icon with the muted surface by default', () => {
    const { container } = render(<IconDate />);
    expect(styledRule(container.firstChild as Element)).toContain(
      'background-color:var(--color-muted)'
    );
  });

  it('fills a disabled masked input with the muted surface', () => {
    const { container, rerender } = render(
      <StyledMaskInput mask={[/\d/]} disabled />
    );
    expect(styledRule(container.firstChild as Element)).toContain(
      'var(--color-muted)'
    );
    rerender(<StyledMaskInput mask={[/\d/]} />);
    expect(styledRule(container.firstChild as Element)).not.toContain(
      'var(--color-muted)'
    );
  });
});
