import styled from 'styled-components';
import { VSelectionList } from '../SelectionList';
import { Button, Classes } from '@blueprintjs/core';
import { Scrollbar } from 'react-scrollbars-custom';
import { PropsWithChildren } from 'react';

export interface IColStyled {
  flex: number;
}

export interface ISelectionListProps {
  height?: string;
}

export const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  height: calc(100% - 45px);
  padding: 0 15px;
  @media (max-width: 500px) {
    min-width: 100%;
  }
  & .empty-container {
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-foreground) 15%, transparent), 0 0 0 transparent,
      0 0 0 transparent;
    border-radius: 3px;
  }
  & ul {
    box-shadow: none;
    margin-bottom: 0;
  }
`;

export const ButtonsEndsContainers = styled.div`
  display: flex;
  padding: 0 5px 5px;
  justify-content: flex-end;
  height: 45px;
  background-color: color-mix(in srgb, var(--color-muted) 41%, transparent);
  border-top: 1px solid color-mix(in srgb, var(--color-border) 71%, transparent);
  align-items: center;
`;

export const FlexCol = styled.div`
  flex: ${(props: IColStyled) => props.flex || 1};
  & > h4 {
    text-align: center;
    color: var(--color-muted-foreground);
  }
  height: 100%;
  max-width: 44%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CentralFlexCol = styled(FlexCol)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & button.${Classes.BUTTON}.${Classes.LARGE} {
    margin-bottom: 0px;
    position: relative;
    padding: 0 15px;
    min-height: 30px;
  }
`;

export const VSelectionListStyled = styled<PropsWithChildren<any>>(
  VSelectionList
)`
  margin-bottom: 10px;
  height: ${(props: ISelectionListProps) =>
    props.height ? props.height : '241px'};
`;

export const SelectAllButtons = styled<PropsWithChildren<any>>(Button)`
  width: 100%;
`;

export const StyledScroll = styled<PropsWithChildren<any>>(Scrollbar)`
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-foreground) 15%, transparent), 0 0 0 transparent,
    0 0 0 transparent;
  border-radius: 3px;
`;
