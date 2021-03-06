import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  Dropdown,
  FontSelector,
  PlotlyFold,
  Numeric,
  Radio,
  TextEditor,
  PlotlySection,
  TraceRequiredPanel,
  VisibilitySelect,
} from '../components';

const StyleLayoutPanel = (props, {localize: _}) => (
  <TraceRequiredPanel>
    <PlotlyFold name={_('Canvas')}>
      <VisibilitySelect
        attr="autosize"
        label={_('Size')}
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
        showOn={false}
        defaultOpt={true}
      >
        <Numeric label={_('Fixed Width')} attr="width" units="px" />
        <Numeric label={_('Fixed height')} attr="height" units="px" />
      </VisibilitySelect>
      <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
      <ColorPicker label={_('Plot Background')} attr="polar.bgcolor" />
      <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
      <Dropdown
        label="Hover Interaction"
        attr="hovermode"
        options={[
          {label: _('Closest'), value: 'closest'},
          {label: _('X Axis'), value: 'x'},
          {label: _('Y Axis'), value: 'y'},
          {label: _('Disable'), value: false},
        ]}
        clearable={false}
      />
      <Dropdown
        label="Drag Interaction"
        attr="dragmode"
        options={[
          {label: _('Orbit'), value: 'orbit'},
          {label: _('Turntable'), value: 'turntable'},
          {label: _('Zoom'), value: 'zoom'},
          {label: _('Pan'), value: 'pan'},
        ]}
        clearable={false}
      />
    </PlotlyFold>
    <PlotlyFold name={_('Aspect Ratio')}>
      <VisibilitySelect
        attr="scene.aspectmode"
        options={[
          {label: _('Auto'), value: 'mode'},
          {label: _('Cube'), value: 'cube'},
          {label: _('Data'), value: 'data'},
          {label: _('Manual'), value: 'manual'},
        ]}
        dropdown={true}
        clearable={false}
        showOn="manual"
        dafault="mode"
      >
        <Numeric label={_('X')} attr="scene.aspectratio.x" step={0.1} />
        <Numeric label={_('Y')} attr="scene.aspectratio.y" step={0.1} />
        <Numeric label={_('Z')} attr="scene.aspectratio.z" step={0.1} />
      </VisibilitySelect>
    </PlotlyFold>
    <PlotlyFold name={_('Title and Fonts')}>
      <PlotlySection name={_('Title')} attr="title">
        <TextEditor attr="title" />
        <FontSelector
          label={_('Typeface')}
          attr="titlefont.family"
          clearable={false}
        />
        <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="titlefont.color" />
      </PlotlySection>
      <PlotlySection name={_('Global Font')}>
        <FontSelector
          label={_('Typeface')}
          attr="font.family"
          clearable={false}
        />
        <Numeric label={_('Font Size')} attr="font.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="font.color" />
      </PlotlySection>
    </PlotlyFold>
    <PlotlyFold name={_('Margins and Padding')}>
      <Numeric label={_('Top')} attr="margin.t" units="px" />
      <Numeric label={_('Bottom')} attr="margin.b" units="px" />
      <Numeric label={_('Left')} attr="margin.l" units="px" />
      <Numeric label={_('Right')} attr="margin.r" units="px" />
      <Numeric label={_('Padding')} attr="margin.pad" units="px" />
    </PlotlyFold>
    <PlotlyFold name={_('Geo Style')}>
      <PlotlySection name={_('Country Borders')} attr="geo.showcountries">
        <Radio
          attr="geo.showcountries"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Border Width')} attr="geo.countrywidth" units="px" />
        <ColorPicker label={_('Border Color')} attr="geo.countrycolor" />
      </PlotlySection>
      <PlotlySection
        name={_('Sub-Country Unit Borders')}
        attr="geo.showsubunits"
      >
        <Radio
          attr="geo.showsubunits"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Border Width')} attr="geo.subunitwidth" units="px" />
        <ColorPicker label={_('Border Color')} attr="geo.subunitcolor" />
      </PlotlySection>
      <PlotlySection name={_('Coastlines')} attr="geo.showcoastlines">
        <Radio
          attr="geo.showcoastlines"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Width')} attr="geo.coastlinewidth" units="px" />
        <ColorPicker label={_('Color')} attr="geo.coastlinecolor" />
      </PlotlySection>
      <PlotlySection name={_('Oceans')} attr="geo.showocean">
        <Radio
          attr="geo.showocean"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <ColorPicker label={_('Color')} attr="geo.oceancolor" />
      </PlotlySection>
      <PlotlySection name={_('Land')} attr="geo.showland">
        <Radio
          attr="geo.showland"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <ColorPicker label={_('Color')} attr="geo.landcolor" />
      </PlotlySection>
      <PlotlySection name={_('Lakes')} attr="geo.showlakes">
        <Radio
          attr="geo.showlakes"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <ColorPicker label={_('Color')} attr="geo.lakecolor" />
      </PlotlySection>
      <PlotlySection name={_('Rivers')} attr="geo.showrivers">
        <Radio
          attr="geo.showrivers"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Width')} attr="geo.riverwidth" units="px" />
        <ColorPicker label={_('Color')} attr="geo.rivercolor" />
      </PlotlySection>
      <PlotlySection name={_('Map Frame')} attr="geo.showframe">
        <Radio
          attr="geo.showframe"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Width')} attr="geo.framewidth" units="px" />
        <ColorPicker label={_('Color')} attr="geo.framecolor" />
      </PlotlySection>
    </PlotlyFold>
  </TraceRequiredPanel>
);

StyleLayoutPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleLayoutPanel;
