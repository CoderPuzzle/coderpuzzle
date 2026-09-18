class Solution {
    leftMostColumnWithOne(matrix) {
        const size = matrix.dimensions();
        const rows = size[0];
        const cols = size[1];
        // Staircase from the top-right corner: on a 1 this is the best
        // column so far (step left — nothing further right matters), on a 0
        // this row is exhausted at or after this column (step down).
        let answer = -1;
        let row = 0;
        let col = cols - 1;
        while (row < rows && col >= 0) {
            if (matrix.get(row, col) === 1) {
                answer = col;
                col -= 1;
            } else {
                row += 1;
            }
        }
        return answer;
    }
}
