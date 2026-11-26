import styled from 'styled-components';
import { Classes } from '@blueprintjs/core';

export const ListFormCol = styled.div`
  width: 100%;
  height: 100%;
  .${Classes.SKELETON}-container {
    box-shadow: 0 0 0 1px var(--ui-skeleton), 0 1px 1px var(--ui-shadow),
      0 2px 6px var(--ui-shadow);
  }
`;

export const FakeContentForm = styled.div`
  height: 20px;
  margin: 5px 5px 10px 5px;
  flex: 1 1 45%;
`;

export const FakeListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
  background-color: var(--ui-active-foreground);
  width: 100%;
  height: 100%;
`;
