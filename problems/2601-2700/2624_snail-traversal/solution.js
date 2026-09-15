// The enhancement itself: an index-math walk. Element i lives in column
// i / rowsCount; within that column its row runs top-to-bottom for even
// columns and bottom-to-top for odd ones, so position = rowsCount - 1 -
// (i % rowsCount) on the way back up. Nothing but the product rule keeps
// input honest — any product mismatch means invalid, rendered as [].
Object.defineProperty(Array.prototype, "snail", {
    value: function (rowsCount, colsCount) {
        if (this.length !== rowsCount * colsCount) {
            return [];
        }
        const matrix = [];
        for (let row = 0; row < rowsCount; row++) {
            matrix.push(new Array(colsCount));
        }
        for (let index = 0; index < this.length; index++) {
            const column = Math.floor(index / rowsCount);
            const inColumn = index % rowsCount;
            const rowNum = column % 2 === 0 ? inColumn : rowsCount - 1 - inColumn;
            matrix[rowNum][column] = this[index];
        }
        return matrix;
    },
});

// The judged entry point: the typed wire hands the plain array here, and
// the traversal itself comes from the enhanced prototype above.
var snail = function (nums, rowsCount, colsCount) {
    return nums.snail(rowsCount, colsCount);
};
