/**
 * @param {number[][]} coordinates
 * @param {number} k
 * @return {number}
 */
var maxPathLength = function (coordinates, k) {
    const pivotX = coordinates[k][0];
    const pivotY = coordinates[k][1];
    const below = [];
    const above = [];
    for (const [x, y] of coordinates) {
        if (x < pivotX && y < pivotY) {
            below.push([x, y]);
        } else if (x > pivotX && y > pivotY) {
            above.push([x, y]);
        }
    }
    return 1 + longestChain(below) + longestChain(above);
};

function longestChain(points) {
    points.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]));
    const tails = [];
    for (const [, y] of points) {
        let low = 0;
        let high = tails.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (tails[mid] < y) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        tails[low] = y;
    }
    return tails.length;
}
