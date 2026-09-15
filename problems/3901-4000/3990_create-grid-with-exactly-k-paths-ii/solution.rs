impl Solution {
    pub fn create_grid(k: i32) -> Vec<String> {
        let e = (usize::BITS - (k as usize).leading_zeros() - 1) as usize;
        if e == 0 {
            return vec![".".to_string()];
        }

        let width = 2 * e + 4; // collector column 2e+3 at the right edge
        let mut grid = vec![vec![b'#'; width]; 2 * e + 1];
        grid[0][0] = b'.'; // start feeds doubler 1's entry (0, 2)
        grid[0][1] = b'.';
        for d in 1..=e {
            for &i in &[2 * d - 2, 2 * d - 1] {
                // open 2x2 doubler
                for &j in &[2 * d, 2 * d + 1] {
                    grid[i][j] = b'.';
                }
            }
            if d < e {
                // forced down-then-right connector; the alternative cell
                // (2d-1, 2d+2) stays an obstacle
                grid[2 * d][2 * d + 1] = b'.';
            }
        }

        let mut top = 2 * e;
        for b in 0..e {
            // bit b shunts from doubler (b+1)'s top-right
            if (k >> b) & 1 == 1 {
                for j in 2 * b + 4..width {
                    grid[2 * b][j] = b'.';
                }
                top = top.min(2 * b);
            }
        }
        // leading bit e: the chain exit drops one row, below every other
        // shunt, then runs right to the collector column
        grid[2 * e][2 * e + 1] = b'.';
        for j in 2 * e + 2..width {
            grid[2 * e][j] = b'.';
        }
        for i in top..=2 * e {
            // collector descends to (2e, 2e+3)
            grid[i][2 * e + 3] = b'.';
        }
        grid.into_iter().map(|row| String::from_utf8(row).unwrap()).collect()
    }
}
