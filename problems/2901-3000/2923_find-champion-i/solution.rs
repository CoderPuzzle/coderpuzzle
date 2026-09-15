impl Solution {
    // The guarantees make "stronger than" a strict total order, so the
    // champion is simply its maximum. Keep the strongest team seen so far
    // and let every later team challenge it: one cell read decides each
    // challenge, and the survivor of all n - 1 of them never lost.
    pub fn find_champion(grid: Vec<Vec<i32>>) -> i32 {
        let mut champion = 0usize;
        for team in 1..grid.len() {
            if grid[team][champion] == 1 {
                champion = team;
            }
        }
        champion as i32
    }
}
