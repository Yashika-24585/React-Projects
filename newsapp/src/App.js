
import React , {useState} from 'react'
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default function App()  {

  // apiKey = "ef732959db0c458f922b3a1c6af4f6ea";
  const apiKey = process.env.REACT_APP_NEWS_API;
  const[progress , setProgress] = useState(0)

  // const setProgress = (progress) => {
  //   setState({ progress: progress })
  // }

    return (
      <div>
        <Router>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route exact path="" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={5} category="general" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={5} category="business" />} />
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="enetertainment" pageSize={5} category="entertainment" />} />
            <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={5} category="general" />} />
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={5} category="health" />} />
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={5} category="science" />} />
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={5} category="sports" />} />
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={5} category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }




