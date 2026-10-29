import React from 'react';
import { times } from 'lodash';
import { Classes } from '@blueprintjs/core';

import { FakeContentForm, FakeListContainer } from './styles';

interface IProps {
  hideShadow?: boolean;
  numberItems?: number;
}

export const VSkeletonForm = (props: IProps) => {
  return (
    <FakeListContainer
      className={props.hideShadow ? '' : `${Classes.SKELETON}-container`}
    >
      {times(props.numberItems ? props.numberItems : 24).map(
        (value: any, index: number) => (
          <FakeContentForm className={Classes.SKELETON} key={index} />
        )
      )}
    </FakeListContainer>
  );
};
