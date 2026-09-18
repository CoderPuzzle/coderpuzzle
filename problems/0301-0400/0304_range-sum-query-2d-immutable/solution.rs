pub struct NumMatrix {
    // Integral image: prefix[r][c] sums rows 0..r-1 and columns 0..c-1,
    // with a guard row and column of zeros so index arithmetic needs no
    // boundary checks. Held in i64: the worst-case total is 4*10^8.
    prefix: Vec<Vec<i64>>,
}

impl NumMatrix {
    pub fn new(matrix: Vec<Vec<i32>>) -> Self {
        let rows = matrix.len();
        let cols = matrix[0].len();
        let mut prefix = vec![vec![0i64; cols + 1]; rows + 1];
        for r in 0..rows {
            for c in 0..cols {
                // Inclusion-exclusion over three already-computed
                // neighbors; the top-left term is subtracted because
                // both the row strip and column strip contain it.
                prefix[r + 1][c + 1] = matrix[r][c] as i64 + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];
            }
        }
        NumMatrix { prefix }
    }

    pub fn sumRegion(&mut self, top: i32, left: i32, bottom: i32, right: i32) -> i64 {
        // The same inclusion-exclusion in reverse: the strips above and
        // left of the query cancel, leaving the rectangle in O(1).
        let prefix = &self.prefix;
        prefix[(bottom + 1) as usize][(right + 1) as usize]
            - prefix[top as usize][(right + 1) as usize]
            - prefix[(bottom + 1) as usize][left as usize]
            + prefix[top as usize][left as usize]
    }
}
