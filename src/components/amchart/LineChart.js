import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

//다크모드
// am4core.useTheme(am4themes_dark);

//animated
am4core.useTheme(am4themes_animated);

//material
am4core.useTheme(am4themes_material);

//license
am4core.options.commercialLicense = true;

class LineChart extends Component {
  static defaultProps = {
    showTitle: false,
    showLegend: false,
    isStepLine: false,
    type: 'date' // date , category 두종류
  }

  constructor(props){
    super();
    this.chartRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      this.chart.data = this.props.data;
    }
    if(prevProps.header !== this.props.header) {
      // console.log(this.chart.series.length);
      this.createSeries();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.createChart();
  }

  createSeries = () => {
    // console.log(this.props.header);
    const { header, type, isStepLine } = this.props;
    const { x, y } = header;

    this.chart.colors.reset();

    const seriesCount = this.chart.series.length;
    for(let i = 0; i < seriesCount; i++) {
      this.chart.series.removeIndex(0).dispose();
    }

    y && y.series && y.series.forEach(s => {
      const series = this.chart.series.push(isStepLine ? new am4charts.StepLineSeries():new am4charts.LineSeries());
      if(type==='date'){
        series.dataFields.dateX = x.key;
      }else{
        series.dataFields.categoryX = x.key;
      }
      series.dataFields.valueY = s.key;
      series.name = s.name
      series.tooltipText = `${s.name}: {valueY}`;
      if(isStepLine){
        series.fillOpacity = 0.5;
      }
    });
  }


  /**
    data: [
      {
        date: '2020-02-23 02:10:20'
        value1: 50
        value2: 50
        value3: 50
      },
      {
        date: '2020-02-23 02:10:30'
        value1: 60
        value2: 60
        value3: 60
      },
    ] ==> 데이터는 이런 형식일듯.... Y축 데이터는 N개가 될 수 있음...
      ==> 데이터는 쿼리에서 X축 값으로 ascending 해주는게 좋을듯..

    header: {
      x: {
        key: "date",  // X축 데이터 field명
        title: "X title", // X축 타이틀
      },
      y: {
        series: [
          { key: "value1", name: "X" }, // Y축 데이터 field명
          { key: "value2", name: "Y" }, // Y축 데이터 field명
          { key: "value3", name: "Z" }, // Y축 데이터 field명
        ],
        title: "Y title", // Y축 타이틀
      }
    },  // header정보 [Mandatory]
    showTitle: false ,  // 타이틀 노출여부 [optional]
    minY: 0, //Y축 최소 범위 [optional]
    maxY: 100, //Y축 최대 범위 [optional],
    .
    .
    .
    필요한 속성 추가하세요.
   */
  createChart = () => {
    const { data, header, showTitle, showLegend, minY, maxY, type, xMinGridDistance, yMinGridDistance, limitLineValue, customValueAxisData, baseInterval, xFormat } = this.props;
    const { x, y } = header;

    let chart = am4core.create(this.chartRef.current, am4charts.XYChart);
    this.chart = chart;
    
    //필수체크 하자...
    if(!data) {
      console.error("'data' is required")
      return;
    }
    if(!header || !x || !y) {
      //console.error("'header' is required")
    }

    chart.paddingRight = 20;
    chart.data = data;

    // X축 설정
    let dateAxis;
    if(type==='date'){
      dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      //dateAxis.dateFormats.setKey("second", "HH:mm:ss");
      //dateAxis.periodChangeDateFormats.setKey('second', 'HH:mm:ss');
      // 입력받는 date string 의 format
      dateAxis.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm:ss';
      //
      if(xFormat){
        dateAxis.dateFormats.setKey("hour", xFormat);
        dateAxis.periodChangeDateFormats.setKey("hour", xFormat);
      }
      // 날짜 표시 간격
      dateAxis.renderer.minGridDistance = xMinGridDistance || 100;
      if(baseInterval){
        dateAxis.baseInterval = baseInterval;
      }
    }else {
      dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      dateAxis.dataFields.category = "category";
      dateAxis.renderer.minGridDistance = xMinGridDistance || 50;
    }
    if(showTitle) {
      dateAxis.title.text = x.title;
    }

    //Y축 설정
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if(showTitle) {
      valueAxis.title.text = y.title;
    }
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    if(yMinGridDistance) {
      valueAxis.renderer.minGridDistance=yMinGridDistance;
    }
    if(minY) {
      valueAxis.min = minY;
    }
    if(maxY) {
      valueAxis.max = maxY;
    }

    // custom 값 세팅
    if(customValueAxisData){
      valueAxis.renderer.labels.template.adapter.add("text", function(text) {
        let rtnVal = customValueAxisData.series.filter(e => e.value == text).map(e =>(e.customValue));
        
        return rtnVal;
      });
    }
    
    chart.cursor = new am4charts.XYCursor();

    //시리즈 설정
    this.createSeries();

    //Legend 설정
    if(showLegend){
      chart.legend = new am4charts.Legend();
      chart.legend.useDefaultMarker = true;
  
      //Legend 의 marker 설정
      let marker = chart.legend.markers.template.children.getIndex(0);
      marker.cornerRadius(2, 2, 2, 2);
      //marker.width = 20;
      //marker.height = 20;
      //marker.paddingTop = 10;
      marker.strokeWidth = 1;
      marker.strokeOpacity = 1;
      marker.stroke = am4core.color("#ccc");
    }

    if(limitLineValue){
      // create a guide
      const range = valueAxis.axisRanges.create();
      range.value = limitLineValue;
      range.grid.stroke = am4core.color('red');
      range.grid.strokeWidth = 1;
      range.grid.strokeOpacity = 1;
      range.grid.strokeDasharray = '3,3'
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const {width, height} = this.props
    return (
      <div ref={this.chartRef} style={{ width, height }}></div>
    );
  }
}

export default LineChart;