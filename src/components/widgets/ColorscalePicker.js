import ColorscalePicker, {
  Colorscale,
  COLOR_PICKER_CONSTANTS,
} from 'react-colorscales';
import Dropdown from './Dropdown';
import Info from '../fields/Info';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';

class Scale extends Component {
  constructor() {
    super();

    this.state = {
      selectedColorscaleType: 'sequential',
      showColorscalePicker: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      showColorscalePicker: !this.state.showColorscalePicker,
    });
  }

  onChange(selectedColorscaleType) {
    this.setState({selectedColorscaleType});
  }

  render() {
    const {onColorscaleChange, selected} = this.props;
    const {selectedColorscaleType, showColorscalePicker} = this.state;
    const description =
      COLOR_PICKER_CONSTANTS.COLORSCALE_DESCRIPTIONS[selectedColorscaleType];
    const colorscaleOptions = COLOR_PICKER_CONSTANTS.COLORSCALE_TYPES.map(
      type => ({
        label: type + ' scales',
        value: type,
      })
    );
    const _ = this.context.localize;

    return (
      <Fragment>
        <Colorscale colorscale={selected} onClick={this.onClick} />

        {showColorscalePicker ? (
          <div className="customPickerContainer">
            <Dropdown
              options={colorscaleOptions}
              value={selectedColorscaleType}
              onChange={this.onChange}
              clearable={false}
              searchable={false}
              placeholder={_('Select a Colorscale Type')}
            />
            {description ? (
              <Fragment>
                <ColorscalePicker
                  onChange={onColorscaleChange}
                  colorscale={selected}
                  width={215}
                  colorscaleType={this.state.selectedColorscaleType}
                  onColorscaleTypeChange={this.onColorscaleTypeChange}
                  disableSwatchControls
                  scaleLength={7}
                />
                <Info>{description}</Info>
              </Fragment>
            ) : null}
          </div>
        ) : null}
      </Fragment>
    );
  }
}

Scale.propTypes = {
  onColorscaleChange: PropTypes.func,
  selected: PropTypes.array,
  label: PropTypes.string,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

export default Scale;
