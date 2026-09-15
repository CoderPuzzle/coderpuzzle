/**
 * @param {number[]} capacity
 * @param {number} itemSize
 * @return {number}
 */
var minimumIndex = function (capacity, itemSize) {
    // The earliest index wins ties, so only a strictly smaller
    // fitting capacity replaces the current best.
    let bestIndex = -1;
    let bestCapacity = Infinity;
    for (let i = 0; i < capacity.length; i++) {
        if (capacity[i] >= itemSize && capacity[i] < bestCapacity) {
            bestCapacity = capacity[i];
            bestIndex = i;
        }
    }
    return bestIndex;
};
