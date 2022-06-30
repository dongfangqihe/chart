import { Popover } from 'antd';

function RectChart(props) {
  const { data } = props;
  return (
    <div className="rect-chart">
      <div className="axisY">
        <div className="axisY-label">
          {
            ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'].map((item, index) => {
              return (
                <div className="axisY-label-item" key={index}>
                  {item}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="rect-chart-main">
        <div className="week">
          {
            Object.keys(data || {}).map((key, index) => {
              return (
                <div className="week-item" key={index}>
                  <Line data={data[key]} week={key} />
                  <span>{key}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="leng">
        <div className="leng-chart-left">
          <div className="leng-chart-high-left">
            <span>100%</span>
            <span>0%</span>
          </div>
          <div className="leng-chart-normal-left">
          </div>
          <div className="leng-chart-low-left">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="leng-chart">
          <div className="leng-chart-high">
          </div>
          <div className="leng-chart-normal">
          </div>
          <div className="leng-chart-low">
          </div>
        </div>
        <div className="leng-chart-right">
          <div className="leng-chart-high-right">
            <span style={{color: '#BC1672' }}>HIGH</span>
            <span>above 180 mg/dL</span>
          </div>
          <div className="leng-chart-normal-right">
            <span style={{color: '#CFC3FB'}}>NORMAL</span>
            <span>70 - 180 mg/dL</span>
          </div>
          <div className="leng-chart-low-right">
            <span style={{color: '#38B4E5'}}>LOW</span>
            <span>below 70 mg/dL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function tipTitle({ week, key }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {`${week} at ${key}`}
    </div>
  )
}

function tipContent(value) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        BG is {
          value > 0 ? <span style={{
            background: '#BC1672',
            color: 'white',
            padding: '3px 4px'
          }}>HIGH</span> : value < 0 ? <span style={{
            background: '#38B4E5',
            color: 'white',
            padding: '3px 4px'
          }}>LOW</span> : <span style={{
            background: 'gray',
            color: 'white',
            padding: '3px 4px'
          }}>NORMAL</span>
        }
      </div>
      <div style={{
        color: value > 0 ? '#BC1672' : value < 0 ? '#38B4E5' : 'gray',
        fontSize: '20px'
      }}>
        { Math.abs(Number(value)) * 100} %
      </div>
      <div style={{ width: '150px'}}>
        of instances for this time of the week
      </div>
    </div>
  )
}

function Line(props) {
  const { data, week } = props;
  return (
    <div
      className="week-item-value"
    >
      {
        Object.keys(data || {}).map((key, index) => {
          return (
            <Popover content={tipContent(data[key])} title={tipTitle({ week, key })}>
              <div
                className="week-item-value-item"
                key={index}
                style={{
                  background: data[key] > 0 ? '#BC1672' : data[key] < 0 ? '#38B4E5' : '#F6F2FB',
                  opacity: Math.abs(data[key])
                }}
              ></div>
            </Popover>
          )
        })
      }
    </div>
  )
}
export default RectChart;