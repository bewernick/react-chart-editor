import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectTraceToPlot,
  connectCartesianSubplotToLayout,
  connectNonCartesianSubplotToLayout,
} from 'lib';
import {TRACE_TO_AXIS} from 'lib/constants';

const TraceFold = connectTraceToPlot(PlotlyFold);
const NonCartesianSubplotFold = connectNonCartesianSubplotToLayout(PlotlyFold);
const CartesianSubplotFold = connectCartesianSubplotToLayout(PlotlyFold);

class SubplotAccordion extends Component {
  render() {
    const {data = [], layout = {}} = this.context;
    const {children, messageIfEmptyFold} = this.props;

    const allCartesianAxisCombinations = data
      .filter(t => TRACE_TO_AXIS.cartesian.some(c => c === t.type))
      .reduce((acc, curVal) => {
        const xaxis = 'xaxis' + (curVal.xaxis ? curVal.xaxis.substring(1) : '');
        const yaxis = 'yaxis' + (curVal.yaxis ? curVal.yaxis.substring(1) : '');

        if (!acc.some(t => t.xaxis === xaxis && t.yaxis === yaxis)) {
          acc.push({
            xaxis: xaxis,
            yaxis: yaxis,
          });
        }
        return acc;
      }, []);

    const cartesianTraces = allCartesianAxisCombinations.map((d, i) => (
      <CartesianSubplotFold
        key={i}
        traceIndexes={[i]}
        canDelete={false}
        messageIfEmpty={messageIfEmptyFold}
        name={`cartesian ${i}`}
        xaxis={d.xaxis}
        yaxis={d.yaxis}
      >
        {children}
      </CartesianSubplotFold>
    ));

    const nonCartesianTraces = [];
    Object.keys(layout).forEach(k => {
      if (
        ['geo', 'mapbox', 'polar', 'scene', 'ternary'].some(t =>
          k.startsWith(t)
        )
      ) {
        nonCartesianTraces.push(
          <NonCartesianSubplotFold
            key={k}
            canDelete={false}
            messageIfEmpty={messageIfEmptyFold}
            subplot={k}
            name={k}
          >
            {children}
          </NonCartesianSubplotFold>
        );
      }
    });

    const noAxesTraces = data
      .filter(t => ['pie', 'table'].some(c => c === t.type))
      .map((d, i) => (
        <TraceFold
          key={i}
          traceIndexes={[i]}
          canDelete={false}
          messageIfEmpty={messageIfEmptyFold}
          name={`${d.type} ${i}`}
        >
          {children}
        </TraceFold>
      ));

    return (
      <TraceRequiredPanel>
        {cartesianTraces && cartesianTraces.length ? cartesianTraces : null}
        {nonCartesianTraces && nonCartesianTraces.length
          ? nonCartesianTraces
          : null}
        {noAxesTraces && noAxesTraces.length ? noAxesTraces : null}
      </TraceRequiredPanel>
    );
  }
}

SubplotAccordion.contextTypes = {
  fullData: PropTypes.array,
  data: PropTypes.array,
  layout: PropTypes.object,
  localize: PropTypes.func,
};

SubplotAccordion.propTypes = {
  children: PropTypes.node,
  messageIfEmptyFold: PropTypes.string,
};

export default SubplotAccordion;
