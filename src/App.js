import React from 'react';
// import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        {/* <Sidebar /> */}
        <Header />
        <Content />
      </div>
    );
  }
}
export default App;
