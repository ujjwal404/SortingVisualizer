import React, { Component } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort';
import { getQuickSortAnimations } from '../sortingAlgorithms/QuickSort';
import './SortingVisualizer.scss';
import './buttons.scss';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'blue';
let ANIMATION_SPEED_MS = 4;

let MIN_SPEED = 1;
let MAX_SPEED = 20;

let MIN_ELEMENTS = 10;
let MAX_ELEMENTS = 50;

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      selected: true,
      elements: MAX_ELEMENTS,
      speed: ANIMATION_SPEED_MS
    };
    this.handleChange = this.handleChange.bind(this);
    this.speedChange = this.speedChange.bind(this);
    this.disableButtons = this.disableButtons.bind(this);

    // this.mergeSort = this.mergeSort.bind(this);
  }

  componentDidMount() {
    this.resetArray();
    this.setRange();

    document.getElementById('flip').oninput = function () {
      var value = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background =
        'linear-gradient(to right, #fff 0%, #fff ' +
        value +
        '%, #006aff ' +
        value +
        '%, #006aff 100%)';
    };
  }

  setRange() {
    if (window.screen.width <= 700 && window.screen.width >= 400) {
      MAX_ELEMENTS = 90;
    } else if (window.screen.width < 400) {
      MAX_ELEMENTS = 50;
    } else {
      MAX_ELEMENTS = 300;
    }
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.elements; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  disableButtons() {
    this.setState({ selected: !this.state.selected }, () => {
      console.log(this.state.selected);
    });
  }
  enableButtons() {
    this.setState({ selected: false }, () => {
      console.log(this.state.selected);
    });
  }

  // will do later :/
  heapSort() {}

  mergeSort() {
    let animations = getMergeSortAnimations(this.state.array);
    this.showAnimations(animations);
  }

  quickSort() {
    const [animations] = getQuickSortAnimations(this.state.array);
    this.showAnimations(animations);
  }
  bubbleSort() {
    const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
    this.showAnimations(animations);
  }

  InsertionSort() {
    const [animations] = getInsertionSortAnimations(this.state.array);
    this.showAnimations(animations);
  }

  SelectionSort() {
    const [animations] = getSelectionSortAnimations(this.state.array);
    this.showAnimations(animations);
  }

  handleChange(e) {
    this.setState({ elements: e.target.value });
    this.resetArray();
  }
  speedChange(e) {
    this.setState({ speed: e.target.value });
  }
  showAnimations(animations) {
    let els = document.querySelectorAll('#button');
    els.forEach((el) => (el.disabled = true));
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
        }, i * this.state.speed);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }
    const RESTORE_TIME = parseInt((this.state.speed * animations.length) / 2 + 3000);
    setTimeout(() => els.forEach((el) => (el.disabled = false)), RESTORE_TIME);
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        <div className="column">
          <div className="sliders">
            <p className="no-of-els"> No. of Elements :</p>
            <input
              type="range"
              className="slider"
              min={MIN_ELEMENTS}
              max={MAX_ELEMENTS}
              onChange={this.handleChange}
            />
            <p className="speed"> Animation Speed</p>
            <div className="change-in">
              <input
                id="flip"
                type="range"
                className="slider"
                min={MIN_SPEED}
                max={MAX_SPEED}
                onChange={this.speedChange}
              />
            </div>
          </div>
          <button id="button" className="slide" onClick={() => this.resetArray()}>
            Reset Array
          </button>
          <button id="button" className="offset" onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
          <button id="button" className="offset" onClick={() => this.quickSort()}>
            Quick Sort
          </button>
          <button id="button" className="offset" onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
          <button id="button" className="offset" onClick={() => this.SelectionSort()}>
            Selection Sort
          </button>
          <button id="button" className="offset" onClick={() => this.InsertionSort()}>
            Insertion Sort
          </button>
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

function disableBtns() {
  let elms = document.querySelectorAll('#button');
  elms.forEach((el) => (el.disabled = true));
}
function enableBtns() {
  let elms = document.querySelectorAll('#button');
  elms.forEach((el) => (el.disabled = false));
}
