import React from 'react';
import {Link } from "react-router-dom";

function App() {
  
  return (
  <div className="App">
    <div className="container">
      <div className="row">
        <h1 className="App__tittle"> React <span> Best </span> powerful rich text editor </h1>
        <Link to="/Add" className="btn btn__theme btn__add"> Create Now </Link>
      </div>
    </div>
  </div>
  );
}

export default App;