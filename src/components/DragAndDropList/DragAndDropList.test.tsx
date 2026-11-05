import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { DragAndDropList } from './DragAndDropList';
import { IDNDList } from './types';

const lists = (): IDNDList[] => [
  {
    id: 'available',
    label: 'Available',
    list: [
      { value: 'f1', label: 'Field One' },
      { value: 'f2', label: 'Field Two' }
    ]
  },
  { id: 'selected', label: 'Selected', list: [] }
];

it('reorders a field with the keyboard and reports the move', () => {
  jest.useFakeTimers();
  const onDragAndDrop = jest.fn();
  const { getByText } = render(
    <DragAndDropList list={lists()} onDragAndDrop={onDragAndDrop} />
  );
  const handle = getByText('Field One').closest(
    '[data-rfd-drag-handle-draggable-id]'
  ) as HTMLElement;
  expect(handle).toHaveAttribute('data-rfd-drag-handle-draggable-id', 'f1');
  handle.focus();
  fireEvent.keyDown(handle, { key: ' ', keyCode: 32 });
  act(() => jest.runOnlyPendingTimers());
  fireEvent.keyDown(handle, { key: 'ArrowDown', keyCode: 40 });
  act(() => jest.runOnlyPendingTimers());
  fireEvent.keyDown(handle, { key: ' ', keyCode: 32 });
  act(() => jest.runAllTimers());
  expect(onDragAndDrop).toHaveBeenCalledWith(
    expect.objectContaining({
      source: { droppableId: 'available', index: 0 },
      destination: { droppableId: 'available', index: 1 },
      draggableId: 'f1'
    })
  );
  jest.useRealTimers();
});
