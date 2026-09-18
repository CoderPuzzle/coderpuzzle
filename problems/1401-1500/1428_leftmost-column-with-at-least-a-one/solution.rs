impl Solution {
    pub fn leftMostColumnWithOne(matrix: &mut BinaryMatrix) -> i32 {
        let size = matrix.dimensions();
        let rows = size[0];
        let cols = size[1];
        // Staircase from the top-right corner: on a 1 this is the best
        // column so far (step left — nothing further right matters), on a 0
        // this row is exhausted at or after this column (step down).
        let mut answer: i32 = -1;
        let mut row: i32 = 0;
        let mut col: i32 = cols - 1;
        while row < rows && col >= 0 {
            if matrix.get(row, col) == 1 {
                answer = col;
                col -= 1;
            } else {
                row += 1;
            }
        }
        answer
    }
}
