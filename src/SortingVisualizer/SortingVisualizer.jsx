import React, { Component } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort';
import './SortingVisualizer.css';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'blue';
const ANIMATION_SPEED_MS = 5;

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 ? 'pink' : 'red';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newheight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newheight}px`;
        }, i * 10);
      }
    }
  }

  quickSort() {}
  heapSort() {}
  bubbleSort() {
    const [animations] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == 'comparision1' || animations[i][0] == 'comparision2';
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color = animations[i][0] == 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
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

  InsertionSort() {
    const [animations] = getInsertionSortAnimations(this.state.array);
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

  SelectionSort() {
    const [animations] = getSelectionSortAnimations(this.state.array);
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

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        <button onClick={() => this.resetArray()}>Reset Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.InsertionSort()}>Insertion Sort</button>
        <button onClick={() => this.SelectionSort()}>Selection Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>TestAlgos</button>
        {array.map((value, idx) => (
          <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
        ))}
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
