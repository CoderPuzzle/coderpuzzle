// The `declare global` merge makes every number[] carry snail() from this
// line on; the method body mirrors the JS bundle exactly: element i lands
// in column i / rowsCount, its row inside the column running top-down for
// even columns and bottom-up for odd ones (position rowsCount - 1 - the
// column-local offset). A product mismatch with the array length means
// invalid input, rendered as [].
declare global {
    interface Array<T> {
        snail(rowsCount: number, colsCount: number): number[][];
    }
}

Array.prototype.snail = function <T>(this: T[], rowsCount: number, colsCount: number): number[][] {
    if (this.length !== rowsCount * colsCount) {
        return [];
    }
    const matrix: number[][] = [];
    for (let row = 0; row < rowsCount; row++) {
        matrix.push(new Array<number>(colsCount));
    }
    for (let index = 0; index < this.length; index++) {
        const column = Math.floor(index / rowsCount);
        const inColumn = index % rowsCount;
        const rowNum = column % 2 === 0 ? inColumn : rowsCount - 1 - inColumn;
        matrix[rowNum][column] = this[index] as unknown as number;
    }
    return matrix;
};

// The judged entry point: the typed wire hands the plain array here, and
// the traversal itself comes from the enhanced prototype above.
function snail(nums: number[], rowsCount: number, colsCount: number): number[][] {
    return nums.snail(rowsCount, colsCount);
}
