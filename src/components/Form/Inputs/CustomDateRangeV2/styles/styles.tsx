import styled from 'styled-components';
import { Classes, DateRangeInput } from '@blueprintjs/datetime';
import { PropsWithChildren } from 'react';

interface IStyledDateRangeProps {
  isUserDefined?: boolean;
}

export const StyledDateRange = styled<PropsWithChildren<any>>(DateRangeInput)`
  & ul.${Classes.DATERANGEPICKER_SHORTCUTS} {
    & li {
      ${(props: IStyledDateRangeProps) =>
        props.isUserDefined &&
        `
      &:not(:last-child) {
        & a {
          background-color: var(--ui-active-foreground) !important;
          color: var(--ui-text-black) !important;
        }
      }
      &:last-child {
        & a {
          background-color: var(--ui-date-selected) !important;
          color: var(--ui-active-foreground) !important;
        }
      }
      `}
    }
  }
`;
