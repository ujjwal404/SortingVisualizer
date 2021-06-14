export function getBubbleSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  bubbleSort(auxillaryArray, animations);

  return [animations, array];
}

function bubbleSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;
  let iters = N - 1;
  while (iters > 0) {
    let swapped = false;
    for (let i = 0; i < iters; ++i) {
      animations.push(['comparison1', i, i + 1]);
      animations.push(['comparison2', i, i + 1]);
      if (auxillaryArray[i] > auxillaryArray[i + 1]) {
        swapped = true;
        animations.push(['swap', i, auxillaryArray[i + 1]]);
        animations.push(['swap', i + 1, auxillaryArray[i]]);
        swap(auxillaryArray, i, i + 1);
      }
    }
    if (swapped === false) break;
    iters--;
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}
