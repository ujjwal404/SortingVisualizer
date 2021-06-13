export function getSelectionSortAnimations(array) {
  let auxiliaryArray = array.slice();
  let animations = [];
  SelectionSort(auxiliaryArray, animations);
  return [animations, array];
}
function SelectionSort(arr, animations) {
  let i, j, min_idx;
  let n = arr.length;
  min_idx = 0;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    animations.push(['comparison1', min_idx, i]);
    for (j = i + 1; j < n; j++) {
      animations.push(['comparison1', j, i]);
      animations.push(['comparison2', j, i]);
      if (arr[j] < arr[min_idx]) {
        animations.push(['comparison1', j, min_idx]);
        animations.push(['comparison2', j, min_idx]);
        min_idx = j;
        animations.push(['assign', min_idx, j]);
      }
    }

    // Swap the found minimum element with the first element
    animations.push(['assign', min_idx, arr[i]]);
    animations.push(['assign', i, arr[min_idx]]);
    swap(arr, min_idx, i);
  }
}
function swap(arr, xp, yp) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}
