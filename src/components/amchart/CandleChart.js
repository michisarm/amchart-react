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

// Calculator Quartile Function List [START]  /////////////////////////////
function Median(data) { return Quartile_50(data); }

function Quartile_25(data) { return Quartile(data, 0.25); }
function Quartile_50(data) { return Quartile(data, 0.5); }
function Quartile_75(data) { return Quartile(data, 0.75); }

function Quartile(data, q) {
  data=Array_Sort_Numbers(data);
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if( (data[base+1]!==undefined) ) {
    return data[base] + rest * (data[base+1] - data[base]);
  } else {
    return data[base];
  }
}

function Array_Sort_Numbers(inputarray){
  return inputarray.sort(function(a, b) {
    return a - b;
  });
}

// function Array_Sum(t){
//    return t.reduce(function(a, b) { return a + b; }, 0); 
// }

// function Array_Average(data) {
//   return Array_Sum(data) / data.length;
// }

function Array_Stdev(tab){
   let i,j,total = 0, mean = 0, diffSqredArr = [];
   for(i=0;i<tab.length;i+=1){
       total+=tab[i];
   }
   mean = total/tab.length;
   for(j=0;j<tab.length;j+=1){
       diffSqredArr.Push(Math.pow((tab[j]-mean),2));
   }
   return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
            return firstEl + nextEl;
          })/tab.length));  
}
// Calculator Quartile Function List [E N D]  /////////////////////////////


class CandleChart extends Component {
  static defaultProps = {
    showTitle: false,
    showLegend: false,
  }

  constructor(props){
    super();
    this.chartRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // if(prevProps.data !== this.props.data) {
    //   console.log('test')
    //   this.chart.data = this.props.data;
    // }
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
    let series = this.chart.series.push(new am4charts.CandlestickSeries());
    // series.dataFields.categoryX = "ptg";
    series.dataFields.categoryX = "sub_group";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.simplifiedProcessing = true;
    series.riseFromOpenState = undefined;
    series.dropFromOpenState = undefined;
    series.fillOpacity = 0;   // add option
    // series.columns.template.width = am4core.percent(10); // set chart width
    series.clustered = false;
    // series.cursorTooltipEnabled = true;
    // series.tooltip.pointerOrientation = "vertical";
    // series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}\nMediana:{mediana}";

    let columnTemplate = series.columns.template;
    columnTemplate.column.tooltipText = "Main Group: {main_group}\n Sub Group: {ptg}\n Max: {highValueY.value}\n Q3: {valueY.value}\n Mediana:{mediana}\n Q1: {openValueY.value}\n Min: {lowValueY.value}";
    columnTemplate.column.tooltipY = 0;

    let medianaSeries = this.chart.series.push(new am4charts.StepLineSeries());
    medianaSeries.noRisers = true;
    medianaSeries.startLocation = 0.1;
    medianaSeries.endLocation = 0.9;
    medianaSeries.dataFields.valueY = "mediana";
    medianaSeries.dataFields.categoryX = "sub_group";
    medianaSeries.strokeWidth = 2;
    medianaSeries.stroke = am4core.color("#fff");
    medianaSeries.clustered = false;

    let topSeries = this.chart.series.push(new am4charts.StepLineSeries());
    topSeries.noRisers = true;
    topSeries.startLocation = 0.2;
    topSeries.endLocation = 0.8;
    topSeries.dataFields.valueY = "high";
    topSeries.dataFields.categoryX = "sub_group";
    topSeries.stroke = this.chart.colors.getIndex(0);
    topSeries.strokeWidth = 2;
    topSeries.clustered = false;

    let bottomSeries = this.chart.series.push(new am4charts.StepLineSeries());
    bottomSeries.noRisers = true;
    bottomSeries.startLocation = 0.2;
    bottomSeries.endLocation = 0.8;
    bottomSeries.dataFields.valueY = "low";
    bottomSeries.dataFields.categoryX = "sub_group";
    bottomSeries.stroke = this.chart.colors.getIndex(0);
    bottomSeries.strokeWidth = 2;
    bottomSeries.clustered = false;

    /* second value axis */
    let valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.syncWithAxis = this.valueAxis;
    valueAxis2.tooltip.disabled = true;

    /* second value series */
    let dotSeries = this.chart.series.push(new am4charts.ColumnSeries());
    dotSeries.dataFields.valueY = "value";
    dotSeries.dataFields.categoryX = "sub_group";
    dotSeries.dataFields.group = "ift";
    dotSeries.dataFields.value = "value";
    dotSeries.columns.template.disabled = true;
    dotSeries.defaultState.transitionDuration = 3000;
    dotSeries.clustered = false;
    dotSeries.cursorTooltipEnabled = false;
    

    let bullet = dotSeries.bullets.push(new am4charts.CircleBullet());
    bullet.tooltipText = "DOT : {sub_group}, {ift}: {value.workingValue.formatNumber('#.##')}";
    bullet.strokeWidth = 0.1;
    bullet.stroke = am4core.color("#ffffff");
    bullet.strokeOpacity = 1;

    bullet.adapter.add("fill", (fill, target) => {
      return target.dataItem.group == "SS" ? "#00BBFF" : "#F00"
    })

    bullet.events.on("inited", function(event){
      event.target.locationX = Number((Math.random() * (0.7 - 0.3) + 0.3).toFixed(2));
    })
    
    /* cursor option - bullet hover */
    let bulletHover = bullet.states.create("hover");
    bulletHover.properties.scale = 1.5;
  }

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

    // chart.paddingRight = 20;

    // X축 설정
    let xAxis;
    xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.renderer.minGridDistance = xMinGridDistance || 40;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.axisFills.template.disabled = true;
    xAxis.renderer.ticks.template.disabled = true;
    xAxis.renderer.grid.template.disabled = true;  // x axis line
    xAxis.dataFields.category = "sub_group";
    xAxis.dataItems.template.text = "{ptg}";
    xAxis.adapter.add("getTooltipText", function(text, target) {
      // return ">>> [bold]" + text + "[/] <<<";
      return ">>>[bold]{ptg}[/]<<<";
    });
    if(showTitle) {
      xAxis.title.text = x.title;
    }

    /* Configure xAxis tooltip 
    https://www.amcharts.com/docs/v4/concepts/axes/axis-tooltips/
    */
    var axisTooltip = xAxis.tooltip;
    axisTooltip.label.fill = am4core.color("#07BEB8");
    axisTooltip.background.fill = am4core.color("dark");
    axisTooltip.background.opacity = 0.7;
    axisTooltip.background.strokeWidth = 0;
    axisTooltip.background.cornerRadius = 3;
    axisTooltip.background.pointerLength = 0;
    axisTooltip.dy = 5;

    /* Configure xAxis tooltip Shadow */
    var dropShadow = new am4core.DropShadowFilter();
    dropShadow.dy = 3;
    dropShadow.dx = 3;
    dropShadow.opacity = 1.5;
    axisTooltip.filters.push(dropShadow);


    //Y축 설정
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = false;  // x axis line
    valueAxis.tooltip.disabled = true;
    
    if(showTitle) {
      valueAxis.title.text = y.title;
    }
    if(yMinGridDistance) {
      valueAxis.renderer.minGridDistance=yMinGridDistance;
    }
    // TODO
    valueAxis.min = 0;
    if(minY) {
      valueAxis.min = minY;
    }
    valueAxis.max = 110;
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

    var rangeTemplate = xAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = xAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#8F3985");
    chart.cursor.lineX.fillOpacity = 0.1;
    chart.cursor.lineY.disabled = true;


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

    // Get Quartile Data [START]  /////////////////////////////
    let getQuartile = function(data) {
      if(Array.isArray(data)){
        
        let tempData = [];
        let plotData = [];
        
        data.forEach(d => {
          if(typeof tempData[d.sub_group] === "undefined"){
            tempData[d.sub_group] = [d.value]
          }else{
            tempData[d.sub_group].push(d.value)
          }
        })
        
        Object.entries(tempData).forEach(d => {
          let tempInfo = data.find(x => x.sub_group === d[0]);
          
          // create range (the additional label at the bottom)
          // if(plotData.length == 0 || !plotData.some(x=>x.main_group == tempInfo.main_group)){
          //   let range = xAxis.axisRanges.create();
          //   range.category = tempInfo.sub_group;
          //   range.endCategory = tempArray[tempArray.length - 1].category;
          //   // Object.keys(tempData).length
          //   range.label.text = tempInfo.main_group;
          //   range.label.dy = 30;
          //   range.label.truncate = true;
          //   range.label.fontWeight = "bold";
          //   range.label.tooltipText = tempInfo.main_group;
          // }
          
          plotData.push({
            "main_group" : tempInfo.main_group,
            "sub_group" : d[0],
            "ptg" : tempInfo.ptg,
            "high": Math.max( ...d[1] ),      // max
            "close": Quartile_75(d[1]),       // 75%
            "mediana" : Median(d[1]),         // mediana
            "open": Quartile_25(d[1]),        // 25%
            "low": Math.min( ...d[1] )        // min
            
          })
        })
        
        function groupArrayOfObjects(list, key) {
          return list.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
          }, {});
        };

        // set Group Label
        let groupedPeople=groupArrayOfObjects(plotData,"main_group");
        if(groupedPeople != null){
          Object.entries(groupedPeople).forEach(d =>{
            let groupData =  d[1][0];
            let range = xAxis.axisRanges.create();

            range.category = groupData.sub_group;
            range.endCategory = d[1][d.length -1].sub_group;
            range.label.text = groupData.main_group;
            range.label.dy = 30;
            range.label.truncate = true;
            range.label.fontWeight = "bold";
            range.label.tooltipText = groupData.main_group;
          })
        }
        return data.concat(plotData);
      }
    }
    // Get Quartile Data [E N D]  /////////////////////////////
    const chartData = getQuartile(data);
    chart.data = chartData;
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

export default CandleChart;