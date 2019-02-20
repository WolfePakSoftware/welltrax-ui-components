import React, { Component } from 'react';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { Button } from '@blueprintjs/core';
import styled from 'styled-components';
import { DropdownStyled } from './style';
import { ActionClickWidget } from '../../Widget';

export interface IOption {
  value: string;
  index: number;
}

export const DefaultSelect = Select.ofType<IOption>();

export interface IDropdownWidget {
  valueSelected?: string;
  filterable?: boolean;
  options: IOption[];
}

export interface IProps extends IDropdownWidget, ActionClickWidget {
  row: number;
  column: number;
}

class DropdownWidget extends Component<IProps, IDropdownWidget> {
  constructor(props: IProps) {
    super(props);
    const valueSelected = this.findValueSelected(props);
    this.state = {
      valueSelected: valueSelected ? valueSelected.value : undefined,
      filterable: props.filterable ? props.filterable : false,
      options: props.options
    };
  }

  private findValueSelected(props: IProps) {
    return props.options.find(x => x.value === props.valueSelected);
  }

  render() {
    if (this.state.valueSelected) {
      const options = this.state.options;
      return (
        <DefaultSelect
          items={options}
          itemPredicate={this.filterOption}
          itemRenderer={this.renderOption}
          filterable={this.state.filterable}
          onItemSelect={this.handleValueChange}
        >
          <DropdownStyled>
            <Button
              rightIcon="caret-down"
              text={
                this.state.valueSelected
                  ? this.state.valueSelected
                  : '(No selection)'
              }
            />
          </DropdownStyled>
        </DefaultSelect>
      );
    }

    return null;
  }

  filterOption: ItemPredicate<IOption> = (query, option) => {
    return (
      `${option.index}. ${option.value.toLowerCase()} `.indexOf(
        query.toLowerCase()
      ) >= 0
    );
  };

  renderOption: ItemRenderer<IOption> = (
    option,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const text = ` ${option.value}`;

    const Item = styled.p`
      cursor: pointer;
      padding: 4px 8px;
      :hover {
        background-color: rgba(167, 182, 194, 0.3);
      }
    `;

    return (
      <Item key={option.index} onClick={handleClick}>
        {text}
      </Item>
    );
  };

  handleValueChange = (option: IOption) => {
    this.setState({ valueSelected: option.value });
    this.props.onClick(this.props.row, this.props.column, option.value);
  };
}

export default DropdownWidget;