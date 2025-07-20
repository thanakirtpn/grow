import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';

import Navbar from './WelcomPage/Navbar';
import Shareknow from './WelcomPage/Shareknow';
import World from './WelcomPage/World';
import Connect from './WelcomPage/Connect';
import Knowlwdge from './WelcomPage/Knowlwdge';
import Login from './Signin/Login'; 
import JoinNow from './Signin/JoinNow';
import Skills from './WelcomPage/Skills';
import Lasttab from './WelcomPage/Lasttab';
import Find from './WelcomPage/Find';
import Homepost from './Signin/Homepost';
import TalkPage from './TalkPage/TalkPage'; 
import AudioCall from './TalkPage/AudioCall';
import IncomingCallOverlay from './TalkPage/IncomingCallOverlay';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className='min-h-screen flex flex-col bg-white-200 text-black-800 overflow-x-hidden'>

        <Routes>
          <Route path="/" element={ 
            <div className="flex-grow">
              <Navbar />
              <Shareknow/>
              <World />
              <Connect />
              <Knowlwdge />
              <Skills />
              <Lasttab />
            </div>
          } />
          <Route path="/Login" element={<Login />} />
          <Route path='/JoinNow' element={<JoinNow />} />
          <Route path='/Find' element={<Find />} />
          <Route path='/Homepost' element={<Homepost />} />
          <Route path="/talk" element={<TalkPage />} />
          <Route path="/audio-call" element={<AudioCall />} />
           
        </Routes>
         <IncomingCallOverlay />
      </div>
    </Router>
  );
}

export default App;
