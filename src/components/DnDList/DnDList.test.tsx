import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { DnDList } from './DnDList';

const list = [
  { id: 'a', content: 'Alpha' },
  { id: 'b', content: 'Bravo' }
];

describe('DnDList', () => {
  it('renders each item as a draggable', () => {
    const { getByText } = render(<DnDList direction="vertical" list={list} />);
    expect(
      getByText('Alpha').closest('[data-rfd-draggable-id]')
    ).toHaveAttribute('data-rfd-draggable-id', 'a');
    expect(
      getByText('Bravo').closest('[data-rfd-drag-handle-draggable-id]')
    ).toHaveAttribute('data-rfd-drag-handle-draggable-id', 'b');
  });

  it('moves an item with the keyboard and reports the new order', () => {
    jest.useFakeTimers();
    const onDragAndDrop = jest.fn();
    const { getByText } = render(
      <DnDList direction="vertical" list={list} onDragAndDrop={onDragAndDrop} />
    );
    const handle = getByText('Alpha').closest(
      '[data-rfd-drag-handle-draggable-id]'
    ) as HTMLElement;
    handle.focus();
    fireEvent.keyDown(handle, { key: ' ', keyCode: 32 });
    act(() => jest.runOnlyPendingTimers());
    fireEvent.keyDown(handle, { key: 'ArrowDown', keyCode: 40 });
    act(() => jest.runOnlyPendingTimers());
    fireEvent.keyDown(handle, { key: ' ', keyCode: 32 });
    act(() => jest.runAllTimers());
    expect(onDragAndDrop).toHaveBeenCalledWith([list[1], list[0]]);
    jest.useRealTimers();
  });
});
