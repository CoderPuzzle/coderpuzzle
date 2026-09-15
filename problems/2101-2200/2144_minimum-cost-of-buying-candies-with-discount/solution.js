/**
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (cost) {
    const values = cost.slice().sort((a, b) => b - a);
    let total = 0;
    for (let index = 0; index < values.length; index++) {
        if (index % 3 !== 2) {
            total += values[index];
        }
    }
    return total;
};
