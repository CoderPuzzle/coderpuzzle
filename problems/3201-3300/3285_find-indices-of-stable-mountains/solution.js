/**
 * @param {number[]} height
 * @param {number} threshold
 * @return {number[]}
 */
var stableMountains = function (height, threshold) {
    // Mountain i is stable exactly when its immediate predecessor is
    // strictly taller than the threshold; one left-to-right pass emits
    // the qualifying indices in ascending order.
    const stable = [];
    for (let i = 1; i < height.length; i++) {
        if (height[i - 1] > threshold) {
            stable.push(i);
        }
    }
    return stable;
};
