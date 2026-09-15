/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var tilingRectangle = function (n, m) {
    // Height of each column: the first column whose top is lowest names
    // the next uncovered cell, so the board state is just m heights.
    const heights = new Array(m).fill(0);
    let best = n * m; // the all-1x1 tiling is always available

    const findHole = () => {
        let column = 0;
        for (let c = 1; c < m; ++c) {
            if (heights[c] < heights[column]) column = c;
        }
        return column;
    };

    const canPlace = (column, side) => {
        for (let c = column; c < column + side; ++c) {
            if (heights[c] !== heights[column]) return false;
        }
        return true;
    };

    const backtrack = (count) => {
        if (count >= best) return;
        const column = findHole();
        if (heights[column] === n) {
            best = count; // every column full
            return;
        }
        // Largest side first: finds a strong incumbent early.
        const maxSide = Math.min(n - heights[column], m - column);
        for (let side = maxSide; side >= 1; --side) {
            if (!canPlace(column, side)) continue;
            for (let c = column; c < column + side; ++c) heights[c] += side;
            backtrack(count + 1);
            for (let c = column; c < column + side; ++c) heights[c] -= side;
        }
    };

    backtrack(0);
    return best;
};
