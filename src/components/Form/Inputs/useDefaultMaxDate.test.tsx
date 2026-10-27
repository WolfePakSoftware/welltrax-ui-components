import React from 'react';
import ReactDOM from 'react-dom';
import { Boundary } from '@blueprintjs/core';
import { VDateRangePicker } from './DateRange';
import { DateRangeDateTimeSection } from './CustomDateRange/components/DateRangeDateTimeSection';
import { VCustomDateRangeV2 } from './CustomDateRangeV2';

jest.mock('@blueprintjs/datetime', () => {
  const actual = jest.requireActual('@blueprintjs/datetime');
  const mockReact = jest.requireActual('react');
  class MockPicker extends mockReact.Component<any> {
    render() {
      mockMaxDates.push(this.props.maxDate);
      return null;
    }
  }
  return { ...actual, DateRangeInput: MockPicker, DateRangePicker: MockPicker };
});

const mockMaxDates: Date[] = [];
const RealDate = Date;
const today = new RealDate(2026, 9, 27, 9, 30);
const sixMonthsLater = new RealDate(2027, 3, 27, 9, 30);
const override = new RealDate(2030, 0, 1);

beforeAll(() => {
  (global as any).Date = class extends RealDate {
    constructor(...args: any[]) {
      super(...((args.length ? args : [today.getTime()]) as []));
    }
    static now() {
      return today.getTime();
    }
  };
});

afterAll(() => {
  (global as any).Date = RealDate;
});

const lastMaxDate = (element: JSX.Element) => {
  const div = document.createElement('div');
  mockMaxDates.length = 0;
  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);
  return mockMaxDates[mockMaxDates.length - 1]?.getTime();
};

const sectionProps = {
  state: {
    start: { date: null, time: today },
    end: { date: null, time: today }
  },
  boundary: Boundary.START,
  onChangeDate: () => {},
  onChangeTime: () => () => {},
  dateType: 'DATE' as const
};

it('VDateRangePicker defaults maxDate to 6 months from today', () => {
  expect(lastMaxDate(<VDateRangePicker />)).toBe(sixMonthsLater.getTime());
  expect(lastMaxDate(<VDateRangePicker maxTime={override} />)).toBe(
    override.getTime()
  );
});

it('VCustomDateTimePicker date section defaults maxDate to 6 months from today', () => {
  expect(lastMaxDate(<DateRangeDateTimeSection {...sectionProps} />)).toBe(
    sixMonthsLater.getTime()
  );
  expect(
    lastMaxDate(
      <DateRangeDateTimeSection {...sectionProps} maxTime={override} />
    )
  ).toBe(override.getTime());
});

it('VCustomDateRangeV2 defaults maxDate to 6 months from today', () => {
  expect(lastMaxDate(<VCustomDateRangeV2 />)).toBe(sixMonthsLater.getTime());
  expect(lastMaxDate(<VCustomDateRangeV2 maxDate={override} />)).toBe(
    override.getTime()
  );
});
