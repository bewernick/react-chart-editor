import React, { Component } from "react";
import PropTypes from "prop-types";
import { _ } from "../common";

import TraceAccordion from "./TraceAccordion";
import Panel from "./Panel";
import Select from "./fields/Select";
import Numeric from "./fields/Numeric";
import Section from "./Section";

/*
 * These are the built-in panels for the editor. If the editor has children specified,
 * those panels will override these.
 */
class DefaultPanels extends Component {
  constructor(props, context) {
    super(props);
    this.dataSources = context.dataSources;
    this.dataSourceNames = context.dataSourceNames;
  }

  render() {
    return (
      <div>
        <Panel name="graph-create">
          <TraceAccordion
            render={() => (
              <div>
                <Select
                  label="Plot Type"
                  attr="mode"
                  options={[
                    { label: "Line", value: "lines" },
                    { label: "Scatter", value: "markers" },
                    { label: "Scatter line", value: "lines+markers" },
                  ]}
                />

                <Select label="X" attr="xsrc" options={this.dataSourceNames} />

                <Select label="Y" attr="ysrc" options={this.dataSourceNames} />

                <Numeric label={_("Marker Size")} attr="marker.size" />
              </div>
            )}
          />
        </Panel>

        <Panel name="style-traces">
          <TraceAccordion
            render={() => (
              <div>
                <Section heading={_("style.traces.trace")}>
                  <Numeric
                    label={_("style.traces.opacity")}
                    min={0}
                    max={1}
                    step={0.1}
                    attr="opacity"
                  />
                </Section>

                <Section heading={_("style.traces.display")} />

                <Section heading={_("style.traces.line-width")}>
                  <Numeric
                    label={_("style.traces.marker-opacity")}
                    min={0}
                    max={1}
                    step={0.1}
                    attr="marker.opacity"
                  />

                  <Numeric
                    label={_("style.traces.marker-size")}
                    attr="marker.size"
                  />

                  <Numeric
                    label={_("style.traces.marker-line-width")}
                    attr="marker.line.width"
                  />
                </Section>
              </div>
            )}
          />
        </Panel>
      </div>
    );
  }
}

DefaultPanels.contextTypes = {
  dataSources: PropTypes.object,
  dataSourceNames: PropTypes.array,
};

export default DefaultPanels;
