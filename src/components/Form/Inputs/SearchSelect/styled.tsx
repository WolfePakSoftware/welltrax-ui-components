import styled from 'styled-components';
import { Checkbox, Icon } from '@blueprintjs/core';
import { PropsWithChildren } from 'react';

export const SelectItemCheckbox = styled<PropsWithChildren<any>>(Checkbox)`
  margin-bottom: 0;
`;

interface IFlexDiv {
  disabled: boolean;
}
export const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--ui-active-foreground) 10%,
    var(--ui-active-foreground) 90%,
    transparent 100%
  );
  margin-right: 1px;
  cursor: ${(props: IFlexDiv) => props.disabled && 'not-allowed'};
  .gsi-selection-info {
    margin: 5px 0;
    padding: 2px 4px;
    font-size: 10px;
  }
  .gsi-selection-info-no-selection {
    padding-right: 15px;
  }
  .gsi-selection-info-deselect {
    padding: 0 3px !important;
    font-weight: bold;
    cursor: ${(props: IFlexDiv) =>
      props.disabled ? 'not-allowed' : 'pointer'};
    margin: 0;
  }
`;

export const CarretIcon = styled<PropsWithChildren<any>>(Icon)`
  background: transparent !important;
  cursor: ${(props: IFlexDiv) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 5px 0 !important;
  padding: 0 1px !important;
  svg {
    fill: var(--ui-text-subtle);
  }
`;

export const StyledUl = styled.ul`
  padding-inline-start: 18px;
  margin-block-start: 2px;
  margin-block-end: 2px;
`;
