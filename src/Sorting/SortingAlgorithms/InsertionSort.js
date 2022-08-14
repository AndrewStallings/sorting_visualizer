export const insertionSort = (arr) => {
    const newArr = [...arr];
    let value = 0;
    let j = 0;
    const animations = [];
    for (let i = 1; i < newArr.length; i++) {
        value = newArr[i];
        j = i - 1;
        while(j >= 0 && newArr[j] > value) {
            let animation = [[j + 1, j], false];
            animations.push(animation);
            animations.push([[j + 1, newArr[j]], true]);
            newArr[j + 1] = newArr[j];
            j = j - 1;
        }
        newArr[j + 1] = value;
        animations.push([[j + 1, value], true]);
    }
    if(newArr.length >= 2) {
        let animation = [[0, 1], false];
        animations.push(animation);
    }
    return animations;
}