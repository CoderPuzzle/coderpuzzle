impl Solution {
    pub fn largest1_bordered_square(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len() as i32;
        let cols = grid[0].len() as i32;
        // prefix[i][j] = sum of the grid rectangle [0..i) x [0..j)
        let mut prefix = vec![vec![0i32; (cols + 1) as usize]; (rows + 1) as usize];
        for i in 0..rows as usize {
            for j in 0..cols as usize {
                prefix[i + 1][j + 1] = grid[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j];
            }
        }
        let rect = |r1: usize, c1: usize, r2: usize, c2: usize| -> i32 {
            prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1]
        };
        let mut best = 0;
        for r1 in 0..rows as usize {
            for c1 in 0..cols as usize {
                let limit = (rows as usize - r1).min(cols as usize - c1);
                for side in 1..=limit {
                    let r2 = r1 + side - 1;
                    let c2 = c1 + side - 1;
                    // Each edge is solid iff its cell sum equals its length.
                    if rect(r1, c1, r1, c2) == side as i32
                        && rect(r2, c1, r2, c2) == side as i32
                        && rect(r1, c1, r2, c1) == side as i32
                        && rect(r1, c2, r2, c2) == side as i32
                        && (side * side) as i32 > best
                    {
                        best = (side * side) as i32;
                    }
                }
            }
        }
        best
    }
}
