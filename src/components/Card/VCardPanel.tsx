import { Elevation, Collapse, IconName, Icon } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import {
  VCardHeader,
  VCardBody,
  VCardTextSpan,
  VCard,
  VCardTextSpanContainer
} from './style';
import React, { Component } from 'react';

interface StyledCardProps {
  noHeader?: boolean;
  headerText?: string;
  children?: any;
  headerIcon?: any;
  headerBackgroundColor?: any;
  backgroundColor?: any;
  headerColor?: any;
  headerHorizontalAlign?: FlexJustify;
  cardElevation?: Elevation;
  height?: string;
  width?: string;
  collapse?: boolean;
  transitionDuration?: number;
  bodyPadding?: string;
  keepChildrenMounted?: boolean;
  openIcon?: IconName;
  closeIcon?: IconName;
  headerOrientation?: HeaderOrientation;
  headerTextJustify?: FlexJustify;
}

interface PanelState {
  isOpen: boolean;
}

export type FlexJustify = 'center' | 'start' | 'end';
export type HeaderOrientation = 'row' | 'row-reverse';

export class VCardPanel extends Component<StyledCardProps, PanelState> {
  constructor(props: StyledCardProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleCollapsed = () => {
    const { isOpen } = this.state;
    this.setState({ ...this.state, isOpen: !isOpen });
  };

    render() {
        const {
            headerIcon,
            headerText,
            children,
            headerBackgroundColor,
            headerHorizontalAlign,
            headerColor,
            backgroundColor,
            cardElevation,
            height,
            width,
            collapse,
            transitionDuration,
            bodyPadding,
            keepChildrenMounted,
            closeIcon,
            openIcon,
            headerOrientation,
            headerTextJustify,
            noHeader

        } = this.props;
        const {isOpen} = this.state;
        return (
            <VCard elevation={cardElevation || 0}
                   height={height}
                   collapse={collapse ? "true" : "false"}
                   transitionduration={transitionDuration}
                   isopen={isOpen ? "true" : "false"}
                   width={width}>
                {!noHeader?
                    <VCardHeader headerBackgroundColor={headerBackgroundColor}
                                headerOrientation = {headerOrientation}
                                headerJustifyContent={headerHorizontalAlign}>
                        <VCardTextSpanContainer>
                            <VCardTextSpan headerColor={headerColor}
                                          headerTextJustify={headerTextJustify}>
                                {headerIcon ? <Icon icon={headerIcon}/> : null}
                                <h5>{headerText}</h5>
                            </VCardTextSpan>
                        </VCardTextSpanContainer>
                        {collapse ?
                            <span onClick={this.toggleCollapsed}>
                            <Icon icon={isOpen ? closeIcon || 'chevron-up' : openIcon || 'chevron-down'}/>
                        </span> : null}
                    </VCardHeader>
                    : null}
                <VCardBody bodyPadding={bodyPadding}
                          backgroundColor={backgroundColor}>
                    {collapse ?
                        <Collapse transitionDuration={transitionDuration || 200}
                                  keepChildrenMounted={keepChildrenMounted}
                                  isOpen={isOpen}>
                            {children}
                        </Collapse>
                        :
                        children
                    }
                </VCardBody>
            </VCard>
        );
    }
}
