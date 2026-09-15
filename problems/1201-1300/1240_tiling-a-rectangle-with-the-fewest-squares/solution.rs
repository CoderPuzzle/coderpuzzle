impl Solution {
    pub fn tiling_rectangle(n: i32, m: i32) -> i32 {
        let n = n as usize;
        let m = m as usize;
        let mut heights = vec![0usize; m];
        let mut best = n * m; // the all-1x1 tiling is always available
                              // Height of each column: the first column whose top is lowest names
                              // the next uncovered cell, so the board state is just m heights.
        fn backtrack(heights: &mut Vec<usize>, n: usize, m: usize, count: usize, best: &mut usize) {
            if count >= *best {
                return;
            }
            let mut column = 0;
            for c in 1..m {
                if heights[c] < heights[column] {
                    column = c;
                }
            }
            if heights[column] == n {
                *best = count; // every column full
                return;
            }
            // Largest side first: finds a strong incumbent early.
            let max_side = (n - heights[column]).min(m - column);
            for side in (1..=max_side).rev() {
                let level = heights[column];
                if heights[column..column + side].iter().any(|&h| h != level) {
                    continue;
                }
                for c in column..column + side {
                    heights[c] += side;
                }
                backtrack(heights, n, m, count + 1, best);
                for c in column..column + side {
                    heights[c] -= side;
                }
            }
        }
        backtrack(&mut heights, n, m, 0, &mut best);
        best as i32
    }
}
