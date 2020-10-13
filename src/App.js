import React, { useState } from 'react';
import Cover from './Pages/Cover/Cover';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Android from './Pages/AndroidPage/Android';
import About from './Pages/About/About';
import Footer from './Pages/Footer/Footer';

function App() {

  const [home, setHome] = useState('')
  const [android, setAndroid] = useState('')
  const [about, setAbout] = useState('')

  return (
    <Router>
      <header style={{textAlign:''}} className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand">Simpel</h3>
          <nav className="nav nav-masthead justify-content-center">
            <Link className={`nav-link ${home}`} to="/" onClick={()=>{
              setHome('active')
              setAndroid('')
              setAbout('')
            }} >Home</Link>
            <Link className={`nav-link ${android}`} to="/android" onClick={()=>{
              setHome('')
              setAndroid('active')
              setAbout('')
            }}>Android</Link>
            <Link className={`nav-link ${about}`} to="/about" onClick={()=>{
              setHome('')
              setAndroid('')
              setAbout('active')
            }}>About</Link>
    
          </nav>
        </div>
      </header>
      <Switch>
          <Route exact path="/">
            <Cover />
          </Route>
          <Route path="/android">
            <Android />
          </Route>
          <Route path="/about">
            <About />
          </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
