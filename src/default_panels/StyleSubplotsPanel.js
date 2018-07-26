import React from 'react';
import PropTypes from 'prop-types';
import {
  NumericFraction,
  SubplotAccordion,
  RectanglePositioner,
} from '../components';

const StyleSubplotsPanel = (props, {localize: _}) => (
  <SubplotAccordion canGroup>
    <RectanglePositioner attr="domain.x[0]" />
    <NumericFraction label={_('X Start')} attr="xaxis.domain[0]" />
    <NumericFraction label={_('X End')} attr="xaxis.domain[1]" />
    <NumericFraction label={_('Y Start')} attr="yaxis.domain[0]" />
    <NumericFraction label={_('Y End')} attr="yaxis.domain[1]" />
  </SubplotAccordion>
);

StyleSubplotsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleSubplotsPanel;
