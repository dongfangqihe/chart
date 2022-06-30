import TimeinRange from '../components/TimeinRange';
import LineEchart  from '../components/LineEchart';
import { useEffect, useState, useContext } from 'react';
import { getOverlay, getSummary } from '../api/api';
import { Modal } from 'antd';
import { Context } from '../App';

function OverlayView() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [datasets, setDatasets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState([]);

  const person = useContext(Context)

  useEffect(() => {
    async function fetchData() {
      const res = await getOverlay();
      setData(res);
      handleClick(current, person);

      const res1 = await getSummary();
      setSummaries(res1);
    }
    fetchData();
  }, [person]);

  const timeout = setTimeout(() => {
    changeSummaryByPerson(current, person);
    window.clearTimeout(timeout);
  })

  function changeSummaryByPerson(current, person) {
    const data = summaries.filter(el => el['subject'] === `Person ${person}`);
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

  function handleClick(value) {
    setCurrent(value);
    changeSummaryByPerson(value, person);
    if (value === 0) {
      setDatasets([
        {
          id: '0',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person}` },
                { dimension: 'period', eq: '1day' },
                { dimension: 'bg', ne: null },
              ]
            }
          }
        }
      ]);
    } else if (value === 1) {
      const dataset = [];
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((item, index) => {
        dataset.push({
          id: `${index+1}`,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person}` },
                { dimension: 'week', eq: data.filter(el => el.subject === `Person ${person}` && el.period === '1week')[0].week },
                { dimension: 'period', eq: '1week' },
                { dimension: 'day', eq: `${item}` },
              ]
            }
          }
        });
      });
      setDatasets(dataset)
    } else if (value === 2) {
      const dataset = [];
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((item, index) => {
        dataset.push({
          id: `${index+1}`,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person}` },
                { dimension: 'week', eq: data.filter(el => el.subject === `Person ${person}` && el.period === '2weeks')[0].week },
                { dimension: 'period', eq: '2weeks' },
                { dimension: 'day', eq: `${item}` },
              ]
            }
          }
        });
      });
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((item, index) => {
        dataset.push({
          id: `${index+8}`,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'subject', eq: `Person ${person}` },
                { dimension: 'week', eq: (Number(data.filter(el => el.subject === `Person ${person}` && el.period === '2weeks')[0].week) + 1).toString() },
                { dimension: 'period', eq: '2weeks' },
                { dimension: 'day', eq: `${item}` },
              ]
            }
          }
        });
      });
      setDatasets(dataset)
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
    <div className="overlay-view">
      <div className="App-charts">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div className='tab-menu'>
          <div className={current === 0 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(0, person)}>
            1 DAY
          </div>
          <div className={current === 1 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(1, person)}>
            1 WEEK
          </div>
          <div className={current === 2 ? 'tab-menu-item tab-active': 'tab-menu-item'} onClick={() => handleClick(2, person)}>
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
          <LineEchart data={data} datasets={datasets}/>
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

export default OverlayView;