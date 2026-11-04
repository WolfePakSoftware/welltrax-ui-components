import { DateRange, DateRangeInput } from '@blueprintjs/datetime';
import { CustomDateRangeV2Store } from './CustomDateRangeV2Store';

describe('CustomDateRangeV2Store.handleOnChange', () => {
  it('passes the range on without logging or writing to the start input', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const startInputElement = document.createElement('input');
    const store = new CustomDateRangeV2Store();
    store.setComponentRef(({ startInputElement } as unknown) as DateRangeInput);
    const onChange = jest.fn();
    const range: DateRange = [new Date(2026, 0, 8), new Date(2026, 0, 15)];

    store.handleOnChange(undefined, onChange)(range);

    expect(onChange).toHaveBeenCalledWith(range);
    expect(store.range).toEqual(range);
    expect(startInputElement.hasAttribute('value')).toBe(false);
    expect(log).not.toHaveBeenCalled();
    log.mockRestore();
  });
});
