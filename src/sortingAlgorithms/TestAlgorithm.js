export function TestAlgorithm(array, sortfunction) {
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  const auxiliaryArray = array.slice();
  console.log(arraysAreEqual(javaScriptSortedArray, sortfunction(auxiliaryArray)));
}

function arraysAreEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  }
  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}
