/**
 * @jest-environment jsdom-fourteen
 */
// Runs src through Babel, which defines decorated fields up front; the tsc-built lib is checked separately.
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { FieldState } from 'formstate';
import { VNumericField } from './NumericField';
import { VSelectField } from './SelectField';
import { VTagInputField } from './TagInputField';

it('NumericField stays in sync with its FieldState: typing and an outside set', () => {
  const fieldState = new FieldState<any>('');
  render(<VNumericField id="qty" fieldState={fieldState} />);
  const input = screen.getByRole('textbox') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '12' } });
  expect(fieldState.value).toBe(12);
  expect(input.value).toBe('12');

  act(() => {
    fieldState.onChange(34);
  });
  expect(input.value).toBe('34');
});

it('SelectField stays in sync with its FieldState: picking an option and an outside set', async () => {
  // Popper.js positions the menu with document.createRange, which jsdom lacks.
  document.createRange = () =>
    ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: document.body
    } as any);
  const fieldState = new FieldState<any>('a');
  const options = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Bravo' },
    { value: 'c', label: 'Charlie' }
  ];
  render(
    <VSelectField
      id="pick"
      fieldState={fieldState}
      options={options}
      filterable={false}
    />
  );
  expect(screen.getByRole('button', { name: 'Alpha' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Alpha' }));
  fireEvent.click(screen.getByText('Bravo'));
  expect(
    await screen.findByRole('button', { name: 'Bravo' })
  ).toBeInTheDocument();
  expect(fieldState.value).toBe('b');

  act(() => {
    fieldState.onChange('c');
  });
  expect(screen.getByRole('button', { name: 'Charlie' })).toBeInTheDocument();
});

it('TagInputField: typing shows the text, Enter adds a tag, and an outside set re-renders', () => {
  const fieldState = new FieldState<any>([]);
  const { container } = render(
    <VTagInputField id="tags" fieldState={fieldState} />
  );
  const input = container.querySelector('input') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'red' } });
  expect(input.value).toBe('red');

  fireEvent.keyDown(input, { key: 'Enter', which: 13, keyCode: 13 });
  expect(fieldState.value).toEqual(['red']);
  expect(screen.getByText('red')).toBeInTheDocument();
  expect(input.value).toBe('');

  act(() => {
    fieldState.onChange(['green', 'blue']);
  });
  expect(screen.queryByText('red')).not.toBeInTheDocument();
  expect(screen.getByText('green')).toBeInTheDocument();
  expect(screen.getByText('blue')).toBeInTheDocument();
});
