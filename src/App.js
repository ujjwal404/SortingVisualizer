import React, { Component } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';
import ThemeToggle from './utils/ThemeSwitch';

export default class App extends Component {
  render() {
    return (
      <header>
        <div className="App">
          <nav className="nav-bar">
            <h2 className="main-head">Sorting Visualizer</h2>
            <div className="right-icons">
              <ThemeToggle />
              <button>github Icon</button>
            </div>
          </nav>
          <SortingVisualizer></SortingVisualizer>
        </div>
      </header>
    );
  }
}
