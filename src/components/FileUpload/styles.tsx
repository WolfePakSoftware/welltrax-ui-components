import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Classes, Dialog } from '@blueprintjs/core';
import { NoFocusMenu } from '../SelectionList/style';

export const OptionsMenu = styled(NoFocusMenu)`
  display: flex;
  width: fit-content;
  min-width: 50px;
`;

export const StyledDialog = styled<PropsWithChildren<any>>(Dialog)`
  height: 380px;
  width: 340px;
`;

export const DivContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

export const FileNameContainer = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  & .${Classes.FORM_GROUP} {
    width: 100%;
  }
`;

export const FileExtSpan = styled.span`
  margin-left: 6px;
  line-height: 30px;
  height: 30px;
  font-weight: 600;
`;

export const PreviewContainer = styled.div`
  border: 1px solid var(--brand-medium-gray);
  overflow: hidden;
  border-radius: 5px;
  width: 320px;
  height: 240px;
  background: var(--brand-medium-gray);
  opacity: 0.69;
`;

export const ButtonsRowContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    flex-grow: 1;
  }
`;
