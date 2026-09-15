impl Solution {
    pub fn count_cells(grid: Vec<Vec<String>>, pattern: String) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let total = m * n;
        let pattern = pattern.into_bytes();
        let length = pattern.len();

        // KMP failure function over the pattern.
        let fail = {
            let mut fail = vec![0usize; length];
            let mut k = 0usize;
            for i in 1..length {
                while k > 0 && pattern[i] != pattern[k] {
                    k = fail[k - 1];
                }
                if pattern[i] == pattern[k] {
                    k += 1;
                }
                fail[i] = k;
            }
            fail
        };
        let starts = |text: &[u8]| -> Vec<usize> {
            let mut found = Vec::new();
            let mut k = 0usize;
            for (i, &ch) in text.iter().enumerate() {
                while k > 0 && ch != pattern[k] {
                    k = fail[k - 1];
                }
                if ch == pattern[k] {
                    k += 1;
                }
                if k == length {
                    found.push(i - length + 1);
                    k = fail[k - 1];
                }
            }
            found
        };

        // Horizontal reads = row-major flatten; vertical reads = column-major.
        let mut horizontal = Vec::with_capacity(total);
        for row in &grid {
            for cell in row {
                horizontal.push(cell.as_bytes()[0]);
            }
        }
        let mut vertical = Vec::with_capacity(total);
        for c in 0..n {
            for r in 0..m {
                vertical.push(grid[r][c].as_bytes()[0]);
            }
        }

        // Difference arrays over the two flatten orders; a match covers
        // positions start .. start + length - 1 in its own flatten order.
        let mut hmark = vec![0i32; total + 1];
        let mut vmark = vec![0i32; total + 1];
        for start in starts(&horizontal) {
            hmark[start] += 1;
            hmark[start + length] -= 1;
        }
        for start in starts(&vertical) {
            vmark[start] += 1;
            vmark[start + length] -= 1;
        }
        for i in 0..total {
            hmark[i + 1] += hmark[i];
            vmark[i + 1] += vmark[i];
        }

        // A cell (r, c) sits at row-major position r*n+c and column-major
        // position c*m+r; it counts iff both marks cover it.
        let mut covered = 0i32;
        for r in 0..m {
            for c in 0..n {
                if hmark[r * n + c] > 0 && vmark[c * m + r] > 0 {
                    covered += 1;
                }
            }
        }
        covered
    }
}
