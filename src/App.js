import { Routes, Route, Link, useHistory } from "react-router-dom";
import React, { createContext, useEffect, useState } from 'react';
import { LineChartOutlined, AreaChartOutlined, SafetyOutlined, PicLeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import AgpView from "./views/AgpView";
import AboutView from "./views/AboutView";
import OverlayView from "./views/OverlayView";
import GlucoMineView from "./views/GlucoMineView"
import './App.css';
import { getSummary } from './api/api';

export const Context = createContext(1);

function App() {
  const [current, setCurrent] = useState(0);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState('1');

  useEffect(() => {
    async function getPersons() {
      const res = await getSummary();
      setPersons(res.map(item => item.subject))
    }
    getPersons();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <span>Chart</span>&nbsp;for &nbsp;
        <select className="select-person" onChange={(e) => setPerson(e.target.value)}>
          {
            persons.map((item, index) => {
              return (
                <option key={index} value={item.split(' ')[1]}>{item}</option>
              )
            })
          }
        </select>
      </header>
      <div className="App-container">
        <div className="App-menu">
          <h1>CHARTS</h1>
          <Link className={current === 0 ? 'active' : ''} to="/" onClick={() => setCurrent(0)}>
            <AreaChartOutlined style={{color: '#7A3FD7' }}/> AGP
          </Link>
          <Link className={current === 1 ? 'active' : ''} to="overlay" onClick={() => setCurrent(1)}>
            <LineChartOutlined style={{color: '#7A3FD7' }}/> Overlay
          </Link>
          <Link className={current === 2 ? 'active' : ''} to="glucomine" onClick={() => setCurrent(2)}>
            <PicLeftOutlined style={{color: '#7A3FD7' }}/> GlucoMine
          </Link>
          <div className='App-menu-bottom'>
            <Link className={current === 3 ? 'active' : ''} to="/about" onClick={() => setCurrent(3)}>
              <QuestionCircleOutlined style={{color: '#7A3FD7' }}/> About
            </Link>
            <Link to="">
              <SafetyOutlined style={{color: '#7A3FD7' }}/> Data Safety
            </Link>
          </div>
        </div>
        <div className="App-content">
          <Context.Provider value={person}>
            <Routes>
              <Route path="/" element={<AgpView />} />
              <Route path="/overlay" element={<OverlayView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/glucomine" element={<GlucoMineView />} />
            </Routes>
          </Context.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
