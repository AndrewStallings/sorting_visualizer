

export const mergeSort = (arr) => {
    const l = 0;
    const r = arr.length;
    const animations = [];
    const arrCopy = [...arr];
    const auxArr = Array(arr.length);
    mergeSortHelper(arrCopy, auxArr, l, r-1, animations);
    return animations;
}

const mergeSortHelper = (arr, aux, l, r, animations) => {
    if(l >= r) {
        return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    mergeSortHelper(arr, aux, l, mid, animations);
    mergeSortHelper(arr, aux, mid + 1, r, animations); 
    merge(arr, aux, l, mid, r, animations);
}

const merge = (arr, aux, l, m, r, animations) => {
    for(let i = l; i <= r; i++) {
        aux[i] = arr[i];
    }
    let i = l;
    let j = m + 1;

    for(let idx = l; idx <= r; idx++) {
        if(i > m) {
            //if i > m means no more on left side of array so only update right
            let animation = [[j], false];
            animations.push(animation);
            animations.push([[idx, aux[j]], true]);
            arr[idx] = aux[j++];
        } else if(j > r) {
            // j > r mans no more on right side only update left 
            let animation = [[i], false];
            animations.push(animation);
            animations.push([[idx, aux[i]], true]);
            arr[idx] = aux[i++];
        } else if (aux[j] > aux[i]) {
            let animation = [[i, j], false];
            animations.push(animation);
            animations.push([[idx, aux[i]], true]);
            arr[idx] = aux[i++];
        } else {
            let animation = [[i, j], false];
            animations.push(animation);
            animations.push([[idx, aux[j]], true]);
            arr[idx] = aux[j++];
        }

    }
}