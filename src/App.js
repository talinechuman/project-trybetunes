import React from 'react';
// import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Header from './components/Header';
import './App.css';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Login />
        <Content />
      </div>
    );
  }
}

export default App;
