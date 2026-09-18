pub struct NumMatrix {
    m: usize,
    n: usize,
    matrix: Vec<Vec<i64>>,
    // 2D Fenwick tree: cell (i, j) sums the rectangle i & -i rows tall and
    // j & -j columns wide ending at (i, j). 1-based in both dims, row/column
    // 0 unused so the low-bit arithmetic is valid.
    tree: Vec<Vec<i64>>,
}

impl NumMatrix {
    pub fn new(matrix: Vec<Vec<i32>>) -> Self {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut regions = NumMatrix {
            m,
            n,
            matrix: matrix
                .into_iter()
                .map(|row| row.into_iter().map(|v| v as i64).collect())
                .collect(),
            tree: vec![vec![0i64; n + 1]; m + 1],
        };
        // O(m*n) build: each source row becomes a 1D Fenwick row in one
        // pass, every finished block pushed into its parent column.
        for i in 1..=m {
            let mut row = vec![0i64; n + 1];
            let source = &regions.matrix[i - 1];
            for j in 1..=n {
                row[j] += source[j - 1];
                let parent = j + (j & j.wrapping_neg());
                if parent <= n {
                    row[parent] += row[j];
                }
            }
            // The finished row is added into its own tree slot, then pushed
            // whole into the parent row's slot.
            for j in 1..=n {
                regions.tree[i][j] += row[j];
            }
            let parent_row = i + (i & i.wrapping_neg());
            if parent_row <= m {
                for j in 1..=n {
                    regions.tree[parent_row][j] += regions.tree[i][j];
                }
            }
        }
        regions
    }

    pub fn update(&mut self, row: i32, col: i32, value: i32) {
        let row = row as usize;
        let col = col as usize;
        // Only the delta is applied; the matrix copy keeps later deltas right.
        let delta = value as i64 - self.matrix[row][col];
        self.matrix[row][col] = value as i64;
        // Dual climb over rows and columns visits exactly the tree cells
        // whose stored rectangle contains the written cell.
        let mut i = row + 1;
        while i <= self.m {
            let mut j = col + 1;
            while j <= self.n {
                self.tree[i][j] += delta;
                j += j & j.wrapping_neg();
            }
            i += i & i.wrapping_neg();
        }
    }

    pub fn sumRegion(&mut self, top: i32, left: i32, bottom: i32, right: i32) -> i64 {
        // Inclusion-exclusion over four top-left-anchored prefix rectangles.
        self.prefix(bottom as usize + 1, right as usize + 1)
            - self.prefix(top as usize, right as usize + 1)
            - self.prefix(bottom as usize + 1, left as usize)
            + self.prefix(top as usize, left as usize)
    }

    fn prefix(&self, rows: usize, cols: usize) -> i64 {
        let mut total = 0i64;
        // Strip low bits from the row index, and within each row strip from
        // the column index; the disjoint rectangles exactly tile the region.
        let mut i = rows;
        while i > 0 {
            let mut j = cols;
            while j > 0 {
                total += self.tree[i][j];
                j -= j & j.wrapping_neg();
            }
            i -= i & i.wrapping_neg();
        }
        total
    }
}
