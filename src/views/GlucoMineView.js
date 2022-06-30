import TimeinRange from '../components/TimeinRange';
import RectChart from '../components/RectChart';
import { useContext, useEffect, useState } from 'react';
import { getGlucoMine, getSummary } from '../api/api';
import { Modal } from 'antd';
import { Context } from '../App';

function AgpView() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState([]);

  const person = useContext(Context)

  useEffect(() => {
    async function fetchData(param) {
      console.log(param);
      const res = await getGlucoMine(param);
      setData(res.filter(el => el.period === '1week')[0].data);
      handleClick(current);

      const res1 = await getSummary();
      setSummaries(res1);
    }
    fetchData(person);
  }, [person]);

  const timeout = setTimeout(() => {
    changeSummaryByPerson(current, person);
    window.clearTimeout(timeout);
  })

  function changeSummaryByPerson(current, person) {
    const data = summaries.filter(el => el['subject'] === `Person ${person}`);
    let raw = {
      summaries: {
        data: {}
      }
    }
    if (data.length > 0) {
      raw = data[0]['summaries'][current];
    }
    setSummary([
      { title: 'MEAN GLUCOSE(CGM)', value: `${Number(raw['data']['Mean']).toFixed(2)}`, unit: 'mg/dL' },
      { title: 'STANDARD DEVIATION', value: `${Number(raw['data']['Standard Deviation']).toFixed(2)}`, unit: '' },
      { title: 'GLUCOSE MANAGEMENT INDICATOR(GMI)', value: `${Number(raw['data']['Glucose Management Indicator (GMI)']).toFixed(2)}%`, unit: '' },
      { title: 'GLUCOSE VARIABILITY', value: `${Number(raw['data']['Glucose Variability (coefficient of variation)']).toFixed(2)}%`, unit: '' },
      { title: 'ESTIMATED A1C', value: `${Number(raw['data']['Estimated A1C']).toFixed(2)}`, unit: '' },
      { title: 'SENSOR USAGE', value: `${Number(raw['data']['Sensor Usage (% available data)']).toFixed(2)}%`, unit: '' },
    ])
    setRange([
      `44%`,
      `44%`,
      `20%`,
      `43%`,
      `44%`
    ])
  }
  async function handleClick(value) {
    setCurrent(value);
    changeSummaryByPerson(value, person);
    const res = await getGlucoMine(person);
    if (value === 0) {
      setData(res.filter(el => el.period === '1week')[0].data);
    } else if (value === 1) {
      setData(res.filter(el => el.period === '1month')[0].data);
    } else if (value === 2) {
      setData(res.filter(el => el.period === '3months')[0].data);
    } else if (value === 3) {
      setData(res.filter(el => el.period === '6months')[0].data);
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="agp-view">
      <div className="App-charts">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div className='tab-menu' style={{width: '300px'}}>
          <div className={current === 0 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(0)}>
            1 WEEK
          </div>
          <div className={current === 1 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(1)}>
            1 MONTH
          </div>
          <div className={current === 2 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(2)}>
            3 MONTH
          </div>
          <div className={current === 3 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(3)}>
            6 MONTH
          </div>
        </div>
        <div style={{
            background: '#683DFF',
            color: 'white',
            width: '20px',
            height: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            lineHeight: '20px',
            fontStyle: 'italic',
            cursor: 'pointer'
          }} onClick={showModal}>
            i
          </div>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
        <div className='tab-content'>
          <RectChart data={data} />
        </div>
      </div>
      <div className="App-content-bottom">
        <div className="App-content-bottom-left">
          <h1>Summary</h1>
          <div className="App-content-bottom-left-summary">
            {
              summary.map(function(item, index) {
                return (
                  <div className="App-content-bottom-left-summary-item" key={index}>
                    <div className="App-content-bottom-left-summary-item-title">
                      {item.title}
                    </div>
                    <div className="App-content-bottom-left-summary-item-value">
                      {item.value}
                    </div>
                    <div className="App-content-bottom-left-summary-item-unit">
                      {item.unit}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="App-content-bottom-right">
          <h1>Time in Range</h1>
          <div className="App-content-bottom-right-summary">
            <TimeinRange value={range} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgpView;