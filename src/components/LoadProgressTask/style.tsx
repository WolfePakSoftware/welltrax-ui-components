import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Classes, Dialog, ProgressBar } from '@blueprintjs/core';

export const SDialog = styled<PropsWithChildren<any>>(Dialog)`
  width: 200px;
  position: relative;
  min-height: 80px;
  padding: 15px;
  & .${Classes.DIALOG_HEADER} {
    padding-right: 0px;
    padding-left: 0px;
    text-align: center;
    min-height: 30px;
    & .${Classes.HEADING} {
      margin-right: 0px;
      font-size: 14px;
    }
  }
`;

export const SProgressBar = styled<PropsWithChildren<any>>(ProgressBar)``;
