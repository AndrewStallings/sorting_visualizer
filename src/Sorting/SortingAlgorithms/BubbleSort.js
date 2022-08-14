export const bubbleSort = (arr) => {
    const newArr = [...arr];
    const animations = [];
    for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < newArr.length-1; j++) {
            if(newArr[j] > newArr[j+1]) {
                let animation = [[j, j + 1], false];
                animations.push(animation);
                animations.push([[j, newArr[j+1]], true]);
                animations.push([[j + 1, newArr[j]], true]);
                let temp = newArr[j];
                newArr[j] = newArr[j+1];
                newArr[j+1] = temp;
            }
        }        
    }
    if(newArr.length >= 2) {
        let animation = [[0, 1], false];
        animations.push(animation);
    }
    return animations;
}