export function getInsertionSortAnimations(array) {
  let auxiliaryArray = array.slice();
  let animations = [];
  insertionSort(auxiliaryArray, animations);
  return [animations, array];
}
function insertionSort(auxiliaryArray, animations) {
  for (let i = 1; i < auxiliaryArray.length; i++) {
    let key = auxiliaryArray[i];
    let j = i - 1;
    animations.push(['comparison1', j, i]);
    animations.push(['comparison2', j, i]);
    while (j >= 0 && auxiliaryArray[j] > key) {
      animations.push(['overwrite', j + 1, auxiliaryArray[j]]);
      auxiliaryArray[j + 1] = auxiliaryArray[j];
      j = j - 1;
      if (j >= 0) {
        animations.push(['comparison1', j, i]);
        animations.push(['comparison2', j, i]);
      }
    }
    animations.push(['overwrite', j + 1, key]);
    auxiliaryArray[j + 1] = key;
  }
}
