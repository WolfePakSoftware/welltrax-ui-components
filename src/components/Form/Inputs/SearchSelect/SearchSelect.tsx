import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { cloneDeep, find, isArray, isNil, orderBy, remove } from 'lodash';
import {
  Classes,
  InputGroup,
  Keys,
  PopoverInteractionKind,
  Popover as WPopover,
  Tooltip as WTooltip
} from '@blueprintjs/core';

import { IItem } from '../../types';
import { SearchSelectItems } from './SearchSelectItems';
import { SelectSelectionInfo } from './SelectSelectionInfo';
import { observer, useLocalStore } from 'mobx-react';
import { SearchSelectStore } from './SearchSelectStore';
import { StyledUl } from './styled';

const Tooltip: PropsWithChildren<any> = WTooltip;
const Popover: PropsWithChildren<any> = WPopover;

type OptionItem = IItem & { additionalSearchText?: string };

interface IProps {
  value: any;
  multi?: boolean;
  allowNewItem?: boolean;
  onAddNewItem?: (value: string) => void;
  options: OptionItem[];
  onChange?: (value: any) => void;
  sort?: 'asc' | 'desc' | undefined;
  popoverWidth?: number;
  fixedInputWidthPx?: number;
  disabled?: boolean;
  allowEmpty?: boolean;
  popoverMinimal?: boolean;
  displayAsTree?: boolean;
  treeChildIndentWidth?: number;
  getValueOnSelectMenuItem?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  cleanSearchAfterIteration?: boolean;
  displayValueTooltip?: boolean;
}

export const SearchSelect = observer((props: IProps) => {
  const {
    options,
    search,
    popoverWidth,
    invokeKeyPress,
    enableFilter,
    isOpen,
    selection,
    hasChange,
    displayTooltip,
    arrayOfValues,
    hideToolTip,
    setSearch,
    setInvokeKeyPress,
    setEnableFilter,
    setPopoverWidth,
    setSelection,
    setIsOpen,
    setOptions,
    handleIsOpen,
    setHasChange,
    showTooltipWithDisabled
  } = useLocalStore<SearchSelectStore>(
    () =>
      new SearchSelectStore(
        props.popoverWidth || props.fixedInputWidthPx || 150
      )
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const findOptionsValue = (options: IItem[], value: number | string): any => {
    return find(
      options,
      (v: IItem) =>
        !isNil(v?.value) &&
        !isNil(value) &&
        v.value.toString() === value.toString()
    );
  };

  useEffect(() => {
    if (props.multi && !isArray(props.value)) {
      throw new Error('Multi Select value must be an array');
    }
    if (!props.multi && props.value !== '') {
      const option = findOptionsValue(props.options, props.value);
      !!option?.label && setSearch(option.label.toString());
    } else if (!props.multi && !props.value) {
      clearSearch();
    } else if (props.multi && !props.value?.length) {
      clearSearch();
    }
    setSelection(props.value);
  }, [props.value, props.options]);

  useEffect(() => {
    props.multi && !!getSelectionLength() && initValueStateMulti(isOpen);
  }, [selection]);

  useEffect(() => {
    props.popoverWidth && setPopoverWidth(props.popoverWidth);
  }, [props.popoverWidth]);

  useEffect(() => {
    let w = 150;
    let opt = props.options.filter((value: OptionItem) => {
      try {
        const factor = !props.multi ? 6.8 : 7.8;
        const lw = value?.label ? value.label.toString().length * factor : 100;
        if (lw > w) {
          w = lw;
        }
        if (isNil(value.value) || isNil(value.label)) {
          return false;
        }

        return (
          value.label
            .toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1 ||
          (value?.additionalSearchText &&
            value.additionalSearchText
              .toString()
              .toLowerCase()
              ?.indexOf(search.toLowerCase()) !== -1) ||
          !enableFilter
        );
      } catch {
        return false;
      }
    });
    if (props.sort && !props.displayAsTree) {
      opt = orderBy(opt, ['label'], [props.sort]);
    }
    setOptions(opt);
    !props.popoverWidth && setPopoverWidth(w + 30);
  }, [props.options, search]);

  useEffect(() => {
    const deselect = (isKeyDeletedPressed = false) => {
      if (isOpen && isKeyDeletedPressed) {
        const reset =
          !props.allowEmpty && !props.multi
            ? selection
            : props?.multi
            ? isArray(selection) && !!selection.length
              ? selection
              : []
            : '';
        setSelection(reset);
        if (!!reset) {
          setEnableFilter(false);
          setIsOpen(true);
        }
        props.onChange && props.onChange(reset);
      }
    };

    if (search.length === 0) {
      deselect();
    }
    if (invokeKeyPress !== 'NONE') {
      if (invokeKeyPress === Keys.DELETE) {
        deselect(true);
        setSearch('');
      }
    }
  }, [search, invokeKeyPress]);

  const clearSearch = () => {
    setSearch('');
  };

  const onSearchChange = (e: any) => {
    !isOpen && setIsOpen(true);
    setEnableFilter(true);
    setSearch(e.target.value);
  };

  const setSearchSelectionText = (value: string | number) => {
    const option = findOptionsValue(props.options, value);
    option?.label
      ? setSearch(option.label.toString())
      : !isNil(value) && setSearch(value.toString());
  };

  const handleInteraction = (nextOpenState: boolean, e?: any) => {
    try {
      if (!props?.isLoading) {
        if (e && !props.disabled) {
          // when user click on the input or caret
          if (
            e.target.parentNode?.className?.indexOf('gsi-input-select') !==
              -1 ||
            e.target.parentNode?.className?.indexOf('gsi-selection-caret') !==
              -1
          ) {
            setIsOpen(nextOpenState);
            !nextOpenState && !props.multi && onChangeItems(selection);
            !props.multi &&
              selection &&
              setSearchSelectionText(selection || '');
            return;
          }
          // when user click on the select info section.
          if (
            e.target.className.indexOf('gsi-selection-info-deselect') !== -1
          ) {
            setIsOpen(false);
            return;
          }
          // when user click on the popover
          if (
            e.currentTarget.className &&
            e.currentTarget?.className?.indexOf('gsi-select-popover') !== -1
          ) {
            setIsOpen(props.multi ? props.multi : false);
            return;
          }
        }
        !props.disabled && setIsOpen(nextOpenState);
        !nextOpenState && !props.multi && onChangeItems(selection);
        initValueStateMulti(nextOpenState);
        !props.multi && selection && setSearchSelectionText(selection || '');
        !props.multi && options.length === 0 && clearSearch();
      }
    } catch (e) {
      !props.disabled && setIsOpen(nextOpenState);
    }
  };

  const initValueStateMulti = (nextOpenState = false) => {
    props.multi && resetStateMulti();
    props.multi && handleUpdateSearchText(nextOpenState);
  };

  const resetStateMulti = () => {
    if (props.multi && selection?.length === 1) {
      const { options } = props;
      const elementSelect = find(
        options,
        (item: IItem) => item.value === selection[0]
      );
      const elementSelectLabel = elementSelect?.label ?? '';
      if (elementSelectLabel !== search) {
        setSearch(elementSelectLabel);
        setEnableFilter(false);
      }
    } else if (props.multi && !props?.value?.length && !selection.length) {
      clearSearch();
    }
  };

  const onChangeItems = (selection: any) => {
    props.onChange?.(selection);
  };

  const shouldUpdateOnClose = () => {
    return (
      props.multi && !props.getValueOnSelectMenuItem && !isOpen && !hasChange
    );
  };

  const deselectAllItems = () => {
    setSelection([]);
    props.onChange?.([]);
  };

  const selectDeselectItem = (value: IItem) => {
    if (props.multi && isArray(selection)) {
      const selected = cloneDeep(selection);
      if (selection.includes(value.value)) {
        remove(selected, val => val === value.value);
      } else {
        selected.push(value.value);
      }
      setEnableFilter(false);
      clearSearch();
      setSelection(selected);
      if (props.getValueOnSelectMenuItem) {
        props.onChange?.(selected);
      }
    } else {
      setSelection(value.value);
      setEnableFilter(false);
      if (!value.value && props.allowEmpty) clearSearch();
    }
    inputRef.current && inputRef.current.focus();
    !props.multi && value?.label && setSearch(value.label.toString());
  };

  const getSelectionLength = () => {
    if (props.multi && isArray(selection)) {
      return selection.length;
    }
    return 0;
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    const { keyCode } = e;

    if (
      keyCode === Keys.ARROW_UP ||
      keyCode === Keys.ARROW_DOWN ||
      keyCode === Keys.ENTER ||
      keyCode === Keys.DELETE
    ) {
      setInvokeKeyPress(keyCode);
      setTimeout(() => {
        setInvokeKeyPress('NONE');
      }, 10);
    }
  };

  const onAddNewItem = () => {
    props.onAddNewItem && props.onAddNewItem(search);
    setIsOpen(false);
    clearSearch();
  };

  const handleUpdateSearchText = (state: boolean) => {
    if (!state && selection?.length === 1) {
      const option = findOptionsValue(
        props.options,
        selection[0]
      )?.label?.toString?.();
      setSearch(option || '');
      return;
    }
    clearSearch();
  };

  const onClose = () => {
    if (shouldUpdateOnClose()) {
      setHasChange(true);
      onChangeItems(selection);
    }
  };

  const onOpened = () => {
    setHasChange(false);
  };

  return (
    <Popover
      targetClassName={'gsi-select-popover'}
      popoverClassName={'bp3-select-popover gsi-select-popover'}
      enforceFocus={false}
      isOpen={isOpen}
      autoFocus={false}
      canEscapeKeyClose={true}
      captureDismiss={true}
      minimal={props.popoverMinimal}
      interactionKind={PopoverInteractionKind.CLICK}
      modifiers={{
        flip: { enabled: true },
        keepTogether: { enabled: true },
        preventOverflow: { enabled: true }
      }}
      onInteraction={handleInteraction}
      shouldReturnFocusOnClose={false}
      onClose={onClose}
      onOpened={onOpened}
    >
      <div
        onKeyUpCapture={onKeyPress}
        onMouseOver={showTooltipWithDisabled(!props.displayValueTooltip)}
        onMouseLeave={hideToolTip}
      >
        <Tooltip
          isOpen={displayTooltip}
          content={
            !props.multi ? (
              arrayOfValues?.[0]
            ) : (
              <StyledUl>
                {arrayOfValues.map((val, index) => (
                  <li key={index}>{val}</li>
                ))}
              </StyledUl>
            )
          }
        >
          <InputGroup
            inputRef={ref => (inputRef.current = ref)}
            autoFocus={false}
            className={
              !props.isLoading
                ? `gsi-input-select ${
                    props.multi ? 'gsi-input-multi-select' : ''
                  }`
                : Classes.SKELETON
            }
            disabled={props.disabled}
            rightElement={
              <SelectSelectionInfo
                disabled={props.disabled ? props.disabled : false}
                count={getSelectionLength()}
                multi={!!props.multi}
                deselectAllItems={deselectAllItems}
              />
            }
            onChange={onSearchChange}
            placeholder={props?.placeholder ?? 'Search'}
            value={search}
          />
        </Tooltip>
      </div>
      <div
        style={{
          width: popoverWidth,
          position: 'relative',
          maxWidth: 400
        }}
        onKeyUpCapture={onKeyPress}
      >
        <SearchSelectItems
          options={options}
          multi={props.multi}
          selection={selection}
          selectDeselectItem={selectDeselectItem}
          invokeKeyPress={invokeKeyPress}
          search={search}
          allowNewItem={!!props.allowNewItem}
          onAddNewItem={onAddNewItem}
          allowEmpty={props.allowEmpty}
          onKeyPressed={handleIsOpen(!props.allowEmpty && !props.multi)}
          displayAsTree={props.displayAsTree}
          treeChildIndentWidth={props.treeChildIndentWidth}
        />
      </div>
    </Popover>
  );
});
