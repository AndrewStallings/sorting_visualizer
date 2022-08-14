export const quickSort = (arr) => {
    const newArr = [...arr];
    const animations = [];
    let low = 0;
    let high = newArr.length - 1;
    quickSortHelper(newArr, low, high, animations);
    return animations;
}
const swap = (arr, i, j, animations) => {
        let animation = [[i, j], false];
        animations.push(animation);
        animations.push([[i, arr[j]], true]);
        animations.push([[j, arr[i]], true]);
        let temp  = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
}

const partition = (arr, low, high, animations) => {
    let p = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if(arr[j] < p) {
            i++
            swap(arr, i, j, animations);
        }
    }
    i++
    swap(arr, i, high, animations);
    return(i);        
}


const quickSortHelper = (arr, low, high, animations) => {
    if (high <= low) {
        return;
    }
    let midPoint = partition(arr, low, high, animations);
    quickSortHelper(arr, low, midPoint - 1, animations);
    quickSortHelper(arr, midPoint + 1, high, animations);
}