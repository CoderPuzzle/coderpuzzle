/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var checkValid = function (matrix) {
    const size = matrix.length;
    for (let index = 0; index < size; index++) {
        const rowSeen = new Array(size + 1).fill(false);
        const colSeen = new Array(size + 1).fill(false);
        for (let offset = 0; offset < size; offset++) {
            const rowValue = matrix[index][offset];
            const colValue = matrix[offset][index];
            if (rowSeen[rowValue] || colSeen[colValue]) return false;
            rowSeen[rowValue] = true;
            colSeen[colValue] = true;
        }
    }
    return true;
};
