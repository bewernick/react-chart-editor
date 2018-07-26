import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';
import {NumericFraction} from './derived';
import Rnd from 'react-rnd';

class UnconnectedRectanglePositioner extends Component {
  constructor(props, context) {
    super(props, context);
    this.sendUpdate = this.sendUpdate.bind(this);
  }

  sendUpdate({x, y, width, height, fieldWidthPx, fieldHeightPx}) {
    this.context.updateContainer({
      'domain.x[0]': x / fieldWidthPx,
      'domain.x[1]': (width + x) / fieldWidthPx,
      'domain.y[0]': (fieldHeightPx - (height + y)) / fieldHeightPx,
      'domain.y[1]': (fieldHeightPx - y) / fieldHeightPx,
    });
  }

  render() {
    const {attr} = this.props;
    const {
      localize: _,
      fullContainer: {
        domain: {x, y},
      },
      fullLayout: {width: plotWidthPx, height: plotHeightPx},
    } = this.context;
    const fieldWidthPx = 300;
    const fieldHeightPx = 300;

    const width = fieldWidthPx * (x[1] - x[0]);
    const height = fieldHeightPx * (y[1] - y[0]);

    return (
      <Field {...this.props} attr={attr}>
        <div
          style={{
            width: fieldWidthPx,
            height: fieldHeightPx,
            border: '1px solid grey',
          }}
        >
          <Rnd
            bounds="parent"
            style={{background: 'lightgrey', border: '1px solid grey'}}
            size={{width, height}}
            position={{
              x: fieldWidthPx * x[0],
              y: fieldHeightPx * (1 - y[1]),
            }}
            onDragStop={(e, d) => {
              this.sendUpdate({
                fieldWidthPx,
                fieldHeightPx,
                width,
                height,
                ...d,
              });
            }}
            onResize={(e, direction, ref, delta, position) => {
              this.sendUpdate({
                fieldWidthPx,
                fieldHeightPx,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              });
            }}
          />
        </div>
        <NumericFraction label={_('X Start')} attr="domain.x[0]" />
        <NumericFraction label={_('X End')} attr="domain.x[1]" />
        <NumericFraction label={_('Y Start')} attr="domain.y[0]" />
        <NumericFraction label={_('Y End')} attr="domain.y[1]" />
      </Field>
    );
  }
}

UnconnectedRectanglePositioner.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedRectanglePositioner.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
  fullContainer: PropTypes.object,
  fullLayout: PropTypes.object,
};

export default connectToContainer(UnconnectedRectanglePositioner);
