import ReactEcharts from "echarts-for-react";
// import echarts from 'echarts/lib/echarts';

function AreaEchart(props) {
  const options = {
    title: {
      text: "GLUCOSE"
    },
    dataset: [
      {
        id: 'dataset_raw',
        source: props.data || []
      },
      ...(props.datasets || [])
    ],
    color: ["#8E56CC"],
    backgroundColor: '#fff',
    tooltip: {
      appendToBody: true,
      trigger: 'axis',
      formatter: function(params) {
        const { time, q5, q95, median } = params[0].data;
        return `
          <div class="tooltip">
            <span class="tooltip-title">${time}</span>
            <span>Glucose(mg/dL)</span>
            <div class="tooltip-content">
              <span style="color: #EAD2FF">${parseInt(q95)}</span>
              <span style="color: #8E56CC">${parseInt(median)}</span>
              <span style="color: #D6B0FF">${parseInt(q5)}</span>
            </div>
          </div>
        `;
      }
    },
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
      interval: 50,
      zlevel: 1,
    },
    series: [
      {
        type: 'line',
        symbol: 'none',
        datasetId: '0',
        color: '#EAD2FF',
        areaStyle: {
          color: '#EAD2FF',
          opacity: 0.5
        },
        encode: {
          x: 'time',
          y: 'q95',
          itemName: 'day',
          tooltip: 'q95'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        datasetId: '1',
        color: '#D6B0FF',
        areaStyle: {
          color: '#D6B0FF',
          opacity: 0.5
        },
        encode: {
          x: 'time',
          y: 'q75',
          itemName: 'day',
          tooltip: 'q75'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        datasetId: '2',
        encode: {
          x: 'time',
          y: 'median',
          itemName: 'day',
          tooltip: 'median'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        datasetId: '3',
        color: '#D6B0FF',
        areaStyle: {
          color: '#FFFFFF',
          opacity: 0.7
        },
        encode: {
          x: 'time',
          y: 'q25',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
      {
        type: 'line',
        symbol: 'none',
        datasetId: '4',
        color: '#EAD2FF',
        areaStyle: {
          color: '#FFFFFF',
          opacity: 0.7
        },
        encode: {
          x: 'time',
          y: 'q5',
          itemName: 'day',
          tooltip: 'bg'
        }
      },
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

export default AreaEchart;