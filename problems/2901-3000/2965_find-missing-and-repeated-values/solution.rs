impl Solution {
    // The grid holds [1, n*n] once each except one value twice and one
    // value never: flag each value in a seen array during one pass, and a
    // re-flagged value is the repeated a; the lone unflagged slot afterward
    // is the missing b.
    pub fn find_missing_and_repeated_values(grid: Vec<Vec<i32>>) -> Vec<i32> {
        let n = grid.len();
        let mut seen = vec![false; n * n + 1];
        let mut a = 0;
        for row in &grid {
            for &v in row {
                if seen[v as usize] {
                    a = v;
                }
                seen[v as usize] = true;
            }
        }
        let mut b: usize = 1;
        while seen[b] {
            b += 1;
        }
        vec![a, b as i32]
    }
}
