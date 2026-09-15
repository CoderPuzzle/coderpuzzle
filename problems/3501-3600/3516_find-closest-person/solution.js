/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
var findClosest = function (x, y, z) {
    // Same speed means arrival order is just distance order, so compare
    // the two absolute distances to the stationary Person 3.
    const dx = Math.abs(x - z);
    const dy = Math.abs(y - z);
    if (dx < dy) return 1;
    if (dy < dx) return 2;
    return 0;
};
