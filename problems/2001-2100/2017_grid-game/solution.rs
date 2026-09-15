impl Solution {
    pub fn grid_game(grid: Vec<Vec<i32>>) -> i64 {
        let mut top_remaining: i64 = grid[0].iter().map(|&points| points as i64).sum();
        let mut bottom_prefix = 0i64;
        let mut answer = i64::MAX;
        for column in 0..grid[0].len() {
            top_remaining -= grid[0][column] as i64;
            answer = answer.min(top_remaining.max(bottom_prefix));
            bottom_prefix += grid[1][column] as i64;
        }
        answer
    }
}
