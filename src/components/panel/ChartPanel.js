import React, { useState, useEffect, useMemo } from 'react';
import { LineChart } from 'components/amchart'
import Panel from 'components/panel/Panel';
import { getSamplePanelData } from 'lib/api';


const header = {
  x: {
    key: "category",
    title: "xyz",
  },
  y: {
    series: [
      {
        key: "x",
        name: "X",
      },
      {
        key: "y",
        name: "Y",
      },
      {
        key: "z",
        name: "Z",
      },
    ],
    title: "test"
  }
}

//type 에 맞는 차트 컴포넌트 찾기 - bar, line, candle
const panelHandler = ({toolbar, menu, data}) => {
  // 공통 props
  let commonProps = {
    
  }
  console.log(data)
  switch (toolbar.chart) {
    case 'line':
      return (
        <LineChart
          {...commonProps}
          id="chartPanel"
          data={data}
          header={header}
          showLegend={true}
          type={'category'}
          width={'100%'}
          height={'100%'}
        />
      )
    default:
      return null;
  }
}

export default function ChartPanel ({toolbar, menu}) {
  const [data, setData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [container, setContainer] = useState();

  // 데이터를 
  useEffect(() => {
    //init interval
    // let intervalRefreshTime = null;
    //data 함수
    console.log('refresh')
    const startFn = () => {
      const data = getSamplePanelData();
      setData(data);
      setIsRefresh(false); //loading end
    } 
    // const startFn = () => getSamplePanelData()
    // .then(({data}) => {
    //   setChartData(data);
    //   setIsRefresh(false); //loading end
    //   //start interval
    //   intervalRefreshTime = setTimeout(() => {
    //       setIsRefresh(true); //loading start
    //       startFn();
    //   }, parseInt(refreshTime));
    // })
    // .catch(e => {
    //   console.error(e);
    // });
    //최초 실행
    startFn();
    //interval clear
    // return () => clearTimeout(intervalRefreshTime);
  }, [toolbar]);

  useEffect(()=>{
    setContainer(panelHandler({toolbar, menu, data}));
  },[data]);

  return (
    <Panel isRefresh={isRefresh}>
      {container}
    </Panel>
  );
};