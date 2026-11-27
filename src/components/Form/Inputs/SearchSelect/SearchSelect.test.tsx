/**
 * @jest-environment jsdom-fourteen
 */
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { SearchSelect } from './SearchSelect';

const options = [
  { value: 1, label: 'Alpha' },
  { value: 2, label: 'Bravo' },
  { value: 3, label: 'Charlie' }
];

const originalCreateRange = document.createRange;

beforeAll(() => {
  // Popper.js positions the popover with document.createRange, which jsdom lacks.
  document.createRange = () =>
    ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: document.body
    } as any);
});

afterAll(() => {
  document.createRange = originalCreateRange;
});

const typeIntoClosedMultiSelect = (selected: number[], text: string) => {
  render(
    <SearchSelect
      multi
      value={selected}
      options={options}
      onChange={() => {}}
    />
  );
  const input = screen.getByRole('textbox') as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: text } });
  });
  return input;
};

describe('SearchSelect multi: typing into a closed select', () => {
  it.each([
    ['no selection', []],
    ['one selection', [1]],
    ['two selections', [1, 2]]
  ])('keeps the typed text with %s', (_name, selected) => {
    const input = typeIntoClosedMultiSelect(selected as number[], 'b');

    expect(input.value).toBe('b');
  });

  it('keeps every character as typing continues', () => {
    const input = typeIntoClosedMultiSelect([], 'b');

    act(() => {
      fireEvent.change(input, { target: { value: 'br' } });
    });

    expect(input.value).toBe('br');
  });

  it('opens the popover while keeping the typed text', () => {
    const input = typeIntoClosedMultiSelect([], 'b');

    expect(input.value).toBe('b');
    expect(screen.getByText('Bravo')).toBeInTheDocument();
  });

  it.each([
    ['no selection', [], ''],
    ['one selection', [1], 'Alpha']
  ])(
    'still resets the text when the popover closes with %s',
    (_name, selected, expectedText) => {
      const input = typeIntoClosedMultiSelect(selected as number[], 'b');
      expect(screen.getByText('Bravo')).toBeInTheDocument();

      act(() => {
        fireEvent.mouseDown(document.body);
      });

      expect(input.value).toBe(expectedText);
    }
  );
});
