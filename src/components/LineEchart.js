import ReactEcharts from "echarts-for-react";
// import echarts from 'echarts/lib/echarts';

function LineEchart(props) {
  const options = {
    title: {
      text: "GLUCOSE"
    },
    lagend: {
      data: props.lagend || []
    },
    dataset: [
      {
        id: 'dataset_raw',
        source: props.data || []
      },
      ...(props.datasets || [])
    ],
    tooltip: {
      trigger: 'axis'
    },
    color: ["#8E56CC", '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    backgroundColor: '#fff',
    grid: {
      top: '55px', left: '40px', right: '20px', bottom: '20px',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
    },
    yAxis: {
      name: 'mg/dL',
      type: 'value',
      interval: 50
    },
    series: [
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '0',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        },
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '1',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '2',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '3',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '4',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '5',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '6',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '7',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '8',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '9',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '10',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '11',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '12',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '13',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        selectedMode: true,
        datasetId: '14',
        encode: {
          x: 'time',
          y: 'bg',
          itemName: 'day',
          tooltip: 'bg'
        }
      }
    ],
  };
  return (
    <div className="echarts-component">
      <ReactEcharts
        option={options}
        className='echarts-for-echarts'
        style={{width: '100%'}}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  )
}

export default LineEchart;