import styled from 'styled-components';
import { Classes } from '@blueprintjs/core';

export const VSearchSelectBody = styled.div`
  .${Classes.FORM_GROUP} {
    margin: 0 0 2px;
    cursor: pointer;

    input {
      pointer-events: none;
    }
  }

  span.${Classes.POPOVER_WRAPPER} {
    span.gsi-select-popover {
      width: 100%;
    }
  }
`;

export const VSearchSelectSectionBody = styled.div`
  max-height: '300px';
`;
