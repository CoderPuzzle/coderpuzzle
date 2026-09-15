use std::collections::VecDeque;

impl Solution {
    pub fn has_valid_path(grid: Vec<Vec<i32>>) -> bool {
        // Each street type is the set of sides it opens. A move between
        // neighbouring cells is legal only when the source opens the shared
        // side AND the target opens the opposite side, so a plain BFS from
        // (0,0) over those mutual connections decides reachability.
        const STREET_SIDES: [&[usize]; 7] = [&[], &[0, 1], &[2, 3], &[0, 3], &[1, 3], &[0, 2], &[1, 2]];
        const STEP: [(i32, i32); 4] = [(0, -1), (0, 1), (-1, 0), (1, 0)];
        const OPPOSITE: [usize; 4] = [1, 0, 3, 2];
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        let mut visited = vec![vec![false; n as usize]; m as usize];
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        queue.push_back((0, 0));
        visited[0][0] = true;
        while let Some((row, col)) = queue.pop_front() {
            if row == m - 1 && col == n - 1 {
                return true;
            }
            for &side in STREET_SIDES[grid[row as usize][col as usize] as usize] {
                let nr = row + STEP[side].0;
                let nc = col + STEP[side].1;
                if nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr as usize][nc as usize] {
                    continue;
                }
                if STREET_SIDES[grid[nr as usize][nc as usize] as usize].contains(&OPPOSITE[side]) {
                    visited[nr as usize][nc as usize] = true;
                    queue.push_back((nr, nc));
                }
            }
        }
        false
    }
}
