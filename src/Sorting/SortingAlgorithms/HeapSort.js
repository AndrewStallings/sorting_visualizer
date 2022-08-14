export const heapSort = (arr) => {
    const newArr = [...arr];
    const animations = [];
    heapSortHelper(newArr, animations);
    return animations;
}

const heapSortHelper = (newArr, animations) => {
    for (let i = Math.floor(newArr.length / 2) - 1; i >= 0; i--) {
        heapify(newArr, newArr.length, i, animations);        
    }

    for(let i = newArr.length - 1; i > 0; i--) {
        let animation = [[0, i], false];
        animations.push(animation);
        animations.push([[0, newArr[i]], true]);
        animations.push([[i, newArr[0]], true]);
        let temp = newArr[0];
        newArr[0] = newArr[i];
        newArr[i] = temp;
        heapify(newArr, i, 0, animations);
    }
}


const heapify = (newArr, len, i, animations) => {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;


    if (left < len && newArr[left] > newArr[max]) {
        max = left;
    }

    if (right < len && newArr[right] > newArr[max]) {
        max = right;
    }

    if(max !== i) {
        let animation = [[i, max], false];
        animations.push(animation);
        animations.push([[i, newArr[max]], true]);
        animations.push([[max, newArr[i]], true]);
        let temp = newArr[i];
        newArr[i] = newArr[max];
        newArr[max] = temp;    
        heapify(newArr, len, max, animations);
    }

}