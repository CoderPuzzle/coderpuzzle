/**
 * @param {number[]} arr
 * @param {number[][]} mat
 * @return {number}
 */
var firstCompleteIndex = function (arr, mat) {
    // Precompute where every value lives, then replay arr bumping each
    // cell's row and column counter; a counter reaching its width or height
    // means that line just finished painting.
    const rows = mat.length;
    const columns = mat[0].length;
    const rowOf = new Array(rows * columns + 1);
    const columnOf = new Array(rows * columns + 1);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            rowOf[mat[r][c]] = r;
            columnOf[mat[r][c]] = c;
        }
    }
    const rowFill = new Array(rows).fill(0);
    const columnFill = new Array(columns).fill(0);
    for (let index = 0; index < arr.length; index++) {
        const value = arr[index];
        if (++rowFill[rowOf[value]] === columns) return index;
        if (++columnFill[columnOf[value]] === rows) return index;
    }
    return -1;
};
