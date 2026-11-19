import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStepsContext } from '../../VSteps';
import CheckMark from '../CheckMark';

interface IStyleProps {
  isActive?: boolean;
  isDone?: boolean;
  mainColor?: string;
  secondaryColor?: string;
}

const SRow = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props: IStyleProps) =>
    props.isActive ? 'var(--color-foreground)' : props.secondaryColor ?? 'var(--color-muted-foreground)'};
`;

const DescriptionDiv = styled('div')`
  width: max-content;
  font-size: smaller;
`;

const CircleDiv = styled('div')`
  height: 30px;
  width: 30px;
  line-height: 30px;
  background-color: ${(props: IStyleProps) =>
    props.isActive ? props.mainColor ?? 'var(--color-primary)' : ''};
  border-radius: 50%;
  border: solid 1px;
  border-color: ${(props: IStyleProps) =>
    props.isDone
      ? props.mainColor ?? 'var(--color-primary)'
      : props.secondaryColor ?? 'var(--color-muted-foreground)'};
  color: ${(props: IStyleProps) =>
    props.isActive ? 'var(--color-muted)' : props.secondaryColor ?? 'var(--color-muted-foreground)'};
  text-align: center;
  margin-right: 5px;
`;

export interface IStepsUpperBarNode {
  title: string;
  description: string;
  icon?: JSX.Element;
  index: number;
  currentStep: number;
  isActive?: boolean;
  isDone?: boolean;
}

const StepsUpperBarNode = (props: IStepsUpperBarNode) => {
  const mainCtx = useContext(MainStepsContext);

  return (
    <>
      <SRow {...props}>
        {props.icon ? (
          props.icon
        ) : (
          <CircleDiv
            {...props}
            mainColor={mainCtx.mainColor}
            secondaryColor={mainCtx.secondaryColor}
          >
            {props.isDone ? <CheckMark /> : props.index}
          </CircleDiv>
        )}
        <div>
          <div>{props.title}</div>
          <DescriptionDiv>{props.description}</DescriptionDiv>
        </div>
      </SRow>
    </>
  );
};

export default StepsUpperBarNode;
