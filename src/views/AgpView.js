import TimeinRange from '../components/TimeinRange';
import AreaEchart from '../components/AreaEchart';
import { useContext, useEffect, useState } from 'react';
import { getAGP, getSummary } from '../api/api';
import { Modal } from 'antd';
import { Context } from '../App';

function AgpView() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [datasets, setDatasets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState([]);

  const person = useContext(Context)

  useEffect(() => {
    (async () => {
      const res = await getAGP();
      setData(res.filter(item => item.median));

      const res1 = await getSummary();
      setSummaries(res1);
      changeSummaryByPerson(current, person, res1);
      handleClick(current, person, res1);
    })();
  }, [person]);

  function changeSummaryByPerson(current, person, res1) {
    const data = res1.filter(el => el['subject'] === `Person ${person}`);
    let raw = {
      data: {}
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

  function handleClick(value, person, res1) {
    setCurrent(value);
    changeSummaryByPerson(value, person, res1);
    if (value === 0) {
      setDatasets([
        {
          id: '2',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person || 1}` },
                { dimension: 'period', eq: '1day' },
              ]
            }
          }
        }
      ]);
    } else if (value === 1) {
      const dataset = [];
      for (let i = 0; i < 5; i++) {
        dataset.push({
          id: `${i}`,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person || 1}` },
                { dimension: 'period', eq: '1week' },
                { dimension: 'date', eq: data.length > 0 ? data.filter(el => el.subject === `Person ${person || 1}` && el.period === '1week')[0]['date'] : '' },
              ]
            }
          }
        });
      }
      setDatasets(dataset);
    } else if (value === 2) {
      const dataset = [];
      for (let i = 0; i < 5; i++) {
        dataset.push({
          id: `${i}`,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person}` },
                { dimension: 'period', eq: '2weeks' },
                { dimension: 'date', eq: data.length > 0 ? data.filter(el => el.subject === `Person ${person}` && el.period === '2weeks')[0]['date'] : '' },
              ]
            }
          }
        });
      }
      setDatasets(dataset);
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
          <div className='tab-menu'>
            <div className={current === 0 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(0, person, summaries)}>
              1 DAY
            </div>
            <div className={current === 1 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(1, person, summaries)}>
              1 WEEK
            </div>
            <div className={current === 2 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(2, person, summaries)}>
              2 WEEK
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
          <AreaEchart data={data} datasets={datasets} />
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