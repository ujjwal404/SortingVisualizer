export function getQuickSortAnimations(array) {
  let animations = [];
  let auxiliaryArray = array.slice();
  let N = auxiliaryArray.length;
  quickSort(auxiliaryArray, 0, N - 1, animations);
  return [animations, array];
}

function quickSort(auxiliaryArray, startIndex, endIndex, animations) {
  let pivotIndex;
  if (startIndex < endIndex) {
    pivotIndex = partition(auxiliaryArray, startIndex, endIndex, animations);
    quickSort(auxiliaryArray, startIndex, pivotIndex - 1, animations);
    quickSort(auxiliaryArray, pivotIndex + 1, endIndex, animations);
  }
}

function partition(auxiliaryArray, startIndex, endIndex, animations) {
  let pivotIndex = randomIntFromInterval(startIndex, endIndex);

  animations.push(['comparison1', pivotIndex, endIndex]);
  animations.push(['swap', pivotIndex, auxiliaryArray[endIndex]]);
  animations.push(['swap', endIndex, auxiliaryArray[pivotIndex]]);
  animations.push(['comparison2', pivotIndex, endIndex]);
  swap(auxiliaryArray, pivotIndex, endIndex);

  let lessTailIndex = startIndex;

  for (let i = startIndex; i < endIndex; ++i) {
    animations.push(['comparison1', i, endIndex]);
    animations.push(['comparison2', i, endIndex]);
    if (auxiliaryArray[i] <= auxiliaryArray[endIndex]) {
      animations.push(['comparision1', i, lessTailIndex]);
      animations.push(['swap', i, auxiliaryArray[lessTailIndex]]);
      animations.push(['swap', lessTailIndex, auxiliaryArray[i]]);
      animations.push(['comparison2', i, lessTailIndex]);
      swap(auxiliaryArray, i, lessTailIndex);
      lessTailIndex++;
    }
  }
  animations.push(['comparison1', lessTailIndex, endIndex]);
  animations.push(['swap', endIndex, auxiliaryArray[lessTailIndex]]);
  animations.push(['swap', lessTailIndex, auxiliaryArray[endIndex]]);
  animations.push(['comparison2', lessTailIndex, endIndex]);

  swap(auxiliaryArray, lessTailIndex, endIndex);
  return lessTailIndex;
}

function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
