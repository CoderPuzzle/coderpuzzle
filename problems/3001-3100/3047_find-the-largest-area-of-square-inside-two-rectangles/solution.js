/**
 * @param {number[][]} bottomLeft
 * @param {number[][]} topRight
 * @return {number}
 */
var largestSquareArea = function (bottomLeft, topRight) {
    let best = 0;
    const n = bottomLeft.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const width = Math.min(topRight[i][0], topRight[j][0]) - Math.max(bottomLeft[i][0], bottomLeft[j][0]);
            const height = Math.min(topRight[i][1], topRight[j][1]) - Math.max(bottomLeft[i][1], bottomLeft[j][1]);
            if (width > 0 && height > 0) {
                const side = Math.min(width, height);
                best = Math.max(best, side * side);
            }
        }
    }
    return best;
};
