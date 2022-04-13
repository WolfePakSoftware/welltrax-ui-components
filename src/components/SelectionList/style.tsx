import { Menu, MenuItem } from '@blueprintjs/core';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface StyledMenuProps {
  active?: boolean;
  background?: any;
  color?: any;
  padding?: any;
  className?: string;
}

export const NoFocusMenu = styled<PropsWithChildren<any>>(Menu)`
  & *:focus {
    outline: none !important;
    outline-offset: unset !important;
    -moz-outline-radius: unset !important;
  }
`;

export interface StyledContainerProps {
  height?: string;
}

export const StyledMenuItem = styled<PropsWithChildren<any>>(MenuItem)`
  ${(props: StyledMenuProps) => {
    const { active, background, color } = props;
    return active
      ? `background: ${background}!important;
         color: ${color}!important;`
      : '';
  }}
  margin-bottom: 2px;
`;

export const StyledMenu = styled(NoFocusMenu)`
  ${(props: StyledMenuProps) => {
    const { padding } = props;
    return padding ? `padding: ${padding}!important;` : '';
  }}
`;

export const SelectionListContainer = styled.div`
  min-height: 25vh;
  height: ${(props: StyledContainerProps) => props.height || `100%`};
  position: relative;
  & > .empty-container {
    min-height: 25vh !important;
  }
`;
