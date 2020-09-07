import React, { useState, useEffect, useMemo } from 'react';
import { LineChart } from 'components/amchart'
import { Panel } from 'components/panel';
import { getSamplePanelData } from 'lib/api';


const header = {
  x: {
    key: "category",
    title: "xx",
  },
  y: {
    series: [
      {
        key: "valueX",
        name: "X",
      },
      {
        key: "valueY",
        name: "Y",
      },
      {
        key: "valueZ",
        name: "Z",
      },
    ],
    title: ""
  }
}

export default function ChartPanel ({title, refreshTime}) {
  const [chartData, setChartData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {    
    //init interval
    let intervalRefreshTime = null;
    //data 함수
    const startFn = () => getSamplePanelData()
    .then(({data}) => {
    setChartData(data);
    setIsRefresh(false); //loading end
    //start interval
    intervalRefreshTime = setTimeout(() => {
        setIsRefresh(true); //loading start
        startFn();
    }, parseInt(refreshTime));
    })
    .catch(e => {
    console.error(e);
    });
    //최초 실행
    startFn();
    //interval clear
    return () => clearTimeout(intervalRefreshTime);
  }, [refreshTime]);
  return (
    <Panel title={title} isRefresh={isRefresh}>
      <LineChart
        id="chartPanel"
        data={chartData}
        header={header}
        showLegend={true}
        type={'category'}
        width={'100%'}
        height={'100%'}
      />
    </Panel>
  );
};