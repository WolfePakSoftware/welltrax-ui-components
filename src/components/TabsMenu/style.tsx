import styled from 'styled-components';
import { Classes } from '@blueprintjs/core';
import { ITabsMenuStyle } from './types';

export const TabsStyle = styled.div`
  & .${Classes.TAB} {
    color: ${(prop: ITabsMenuStyle) => prop.color && prop.color};
  }
  & :hover {
    color: ${(prop: ITabsMenuStyle) => prop.hoverColor && prop.hoverColor};
  }
  .${Classes.TAB_INDICATOR} {
    background-color: ${(props: ITabsMenuStyle) =>
      props.indicatorActive && props.indicatorActive};
  }
  & :focus {
    outline: none;
  }
  .${Classes.TAB}[aria-selected='true'] {
    color: ${(prop: ITabsMenuStyle) => prop.active && prop.active};
  }
`;

export const TabIcon = styled.div`
  display: flex;
`;

export const labelIcon = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 5px 0 0'
};
