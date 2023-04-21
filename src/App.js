import React from 'react';
// import Sidebar from './components/Sidebar';
import Routes from './components/Routes';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Sidebar /> */}
        <Header />
        <Routes />
      </div>
    );
  }
}
export default App;
