import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export default function connectNonCartesianSubplotToLayout(WrappedComponent) {
  class SubplotConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteSubplot = this.deleteSubplot.bind(this);
      this.updateSubplot = this.updateSubplot.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {subplot} = props;
      const {container, fullContainer} = context;

      this.container = container[subplot] || {};
      this.fullContainer = fullContainer[subplot] || {};
    }

    getChildContext() {
      return {
        getValObject: attr =>
          !this.context.getValObject
            ? null
            : this.context.getValObject(`${this.props.subplot}.${attr}`),
        updateContainer: this.updateSubplot,
        deleteContainer: this.deleteSubplot,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateSubplot(update) {
      const newUpdate = {};
      for (const key in update) {
        newUpdate[`${this.props.subplot}.${key}`] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    deleteSubplot() {
      // TODO: do we need this and how?
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.UPDATE_LAYOUT,
          payload: {subplot: this.props.subplot},
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  SubplotConnectedComponent.displayName = `SubplotConnected${getDisplayName(
    WrappedComponent
  )}`;

  SubplotConnectedComponent.propTypes = {
    subplot: PropTypes.string.isRequired,
  };

  SubplotConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  SubplotConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  SubplotConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SubplotConnectedComponent;
}
