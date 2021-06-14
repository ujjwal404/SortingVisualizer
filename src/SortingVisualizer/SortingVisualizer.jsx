import React, { Component } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort';
import { getQuickSortAnimations } from '../sortingAlgorithms/QuickSort';
import './SortingVisualizer.css';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'blue';
const ANIMATION_SPEED_MS = 5;

const MIN_ELEMENTS = 10;
const MAX_ELEMENTS = 300;

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      selected: false,
      elements: 100
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function (event) {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.elements; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }
  disableButtons() {
    this.setState({
      selected: true
    });
  }

  async mergeSort() {
    let animations = getMergeSortAnimations(this.state.array);
    showAnimations(animations);
  }

  // will do later :/
  heapSort() {}

  quickSort() {
    const [animations] = getQuickSortAnimations(this.state.array);
    showAnimations(animations);
  }
  bubbleSort() {
    const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
    showAnimations(animations);
  }

  InsertionSort() {
    const [animations] = getInsertionSortAnimations(this.state.array);
    showAnimations(animations);
  }

  SelectionSort() {
    const [animations] = getSelectionSortAnimations(this.state.array);
    showAnimations(animations);
  }

  handleChange(e) {
    this.setState({ elements: e.target.value });
    this.resetArray();
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        <div className="column">
          <input
            type="range"
            className="slider"
            min={MIN_ELEMENTS}
            max={MAX_ELEMENTS}
            onChange={this.handleChange}
          />
          <button disabled={this.state.selected} onClick={() => this.resetArray()}>
            Reset Array
          </button>

          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.InsertionSort()}>Insertion Sort</button>
          <button onClick={() => this.SelectionSort()}>Selection Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
        <div className="frame">
          {array.map((value, idx) => (
            <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function showAnimations(animations) {
  for (let i = 0; i < animations.length; i++) {
    const isColorChange = animations[i][0] == 'comparison1' || animations[i][0] == 'comparison2';
    const arrayBars = document.getElementsByClassName('array-bar');
    if (isColorChange === true) {
      const color = animations[i][0] == 'comparison1' ? SECONDARY_COLOR : PRIMARY_COLOR;
      const [comparision, barOneIndex, barTwoIndex] = animations[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      const [swap, barIndex, newHeight] = animations[i];
      if (barIndex === -1) {
        continue;
      }
      const barStyle = arrayBars[barIndex].style;
      setTimeout(() => {
        barStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}
