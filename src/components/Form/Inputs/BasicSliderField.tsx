import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import {
  FormGroup,
  IconName,
  NumericInput,
  Intent,
  Slider
} from '@blueprintjs/core';

import { FieldState } from 'formstate';
import { IFieldProps } from './IFieldProps';
import { StyledFormGroup } from './style';

/**
 * Field Props
 */
export interface ISliderFieldProps extends IFieldProps {
  min?: number;
  max?: number;
  stepSize?: number;
  labelStepSize?: number;
  vertical?: boolean;
  fill?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VBasicSliderField extends React.Component<ISliderFieldProps> {
  constructor(props: ISliderFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      id,
      min,
      max,
      stepSize,
      labelStepSize,
      className,
      layer,
      fill
    } = this.props;

    return (
      <StyledFormGroup
        className={className}
        disabled={disabled}
        helperText={fieldState.hasError && fieldState.error}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        fill={fill}
        layer={layer}
      >
        <label>{label}</label>
        <div>
          <Slider
            {...{
              disabled,
              id,
              min,
              max,
              stepSize,
              labelStepSize
            }}
            onChange={this.onChange}
            value={fieldState.value || 0}
          />
        </div>
      </StyledFormGroup>
    );
  }

  onChange = (e: any) => {
    this.props.fieldState.onChange(e);
    if (this.props.onChange) {
      this.props.onChange!(e);
    }
  };
}
