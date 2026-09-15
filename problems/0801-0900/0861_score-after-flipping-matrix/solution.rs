impl Solution {
    // A leading 1 outweighs the rest of its row combined, so every row is
    // flipped to a 1 head and contributes 2^(n-1) up front; after the head
    // pass, cell (i, j) is 1 exactly where the row agreed with its own head,
    // so a column toggle trades k for m - k.
    pub fn matrix_score(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        let mut score = m << (n - 1);
        for j in 1..n {
            let mut agree = 0;
            for row in &grid {
                if row[j as usize] == row[0] {
                    agree += 1;
                }
            }
            let best = agree.max(m - agree);
            score += best << (n - 1 - j);
        }
        score
    }
}
