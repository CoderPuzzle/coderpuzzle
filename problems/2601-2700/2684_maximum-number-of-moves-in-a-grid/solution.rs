impl Solution {
    pub fn max_moves(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let columns = grid[0].len();
        let mut reachable = vec![true; rows];
        let mut moves = 0;
        for column in 0..columns - 1 {
            let mut next = vec![false; rows];
            let mut reached = 0;
            for row in 0..rows {
                if !reachable[row] {
                    continue;
                }
                let value = grid[row][column];
                for target in row.saturating_sub(1)..(row + 2).min(rows) {
                    if !next[target] && grid[target][column + 1] > value {
                        next[target] = true;
                        reached += 1;
                    }
                }
            }
            if reached == 0 {
                break;
            }
            reachable = next;
            moves += 1;
        }
        moves
    }
}
