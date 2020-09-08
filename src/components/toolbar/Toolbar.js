import React from "react";
import { ReactComponent as EachSVG } from 'svg/each.svg';
import { ReactComponent as SumSVG } from 'svg/sum.svg';
import { ReactComponent as ListSVG } from 'svg/list.svg';
import { ReactComponent as BarSVG } from 'svg/bar.svg';
import { ReactComponent as LineSVG } from 'svg/line.svg';
import { ReactComponent as CandleSVG } from 'svg/candle.svg';

const Toolbar = ({updateField}) => {
  return (
    <>
      <div id="chart-toolbar" className="chart-button-row">
        <span
          className="chart-button-group"
          data-chart-button-group="data-tools"
        >
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="Number"
            name="number"
            onClick={updateField}
          >
            Num
          </button>
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="Percent"
            name="percent"
            onClick={updateField}
          >
            %
          </button>
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="Ct"
            name="ct"
            onClick={updateField}
          >
            Ct
          </button>
        </span>
        <span
          className="chart-button-group"
          data-chart-button-group="type-tools"
        >
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="each"
            name="each"
            onClick={updateField}
          >
            <EachSVG/>
          </button>
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="sum"
            name="sum"
            onClick={updateField}
          >
            <SumSVG/>
          </button>
        </span>
        <span
          className="chart-button-group"
          data-chart-button-group="chart-tools"
        >
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="list"
            name="list"
            onClick={updateField}
          >
            <ListSVG/>
          </button>
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="bar"
            name="bar"
            onClick={updateField}
          >
            <BarSVG/>
          </button>
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="line"
            name="line"
            onClick={updateField}
          >
            <LineSVG/>
          </button>
          <button
            type="button"
            data-chart-attribute=""
            className="chart-button"
            title="candle"
            name="candle"
            onClick={updateField}
          >
            <CandleSVG/>
          </button>
        </span>
      </div>
    </>
  );
};
export default Toolbar;
