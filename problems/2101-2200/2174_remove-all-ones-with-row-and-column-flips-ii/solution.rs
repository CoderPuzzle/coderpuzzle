use std::collections::HashMap;

impl Solution {
    pub fn remove_ones(grid: Vec<Vec<i32>>) -> i32 {
        // Recursion over "which 1-cell do we clear next" with a memo map
        // keyed on the bitmask of remaining ones. At most 15 cells bounds
        // both the state count and the branching factor per state.
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        let mut state: u32 = 0;
        for i in 0..m as usize {
            for j in 0..n as usize {
                if grid[i][j] == 1 {
                    state |= 1u32 << ((i * n as usize + j) as u32);
                }
            }
        }
        let mut memo: HashMap<u32, i32> = HashMap::new();
        Self::solve(state, m, n, &mut memo)
    }

    fn solve(state: u32, m: i32, n: i32, memo: &mut HashMap<u32, i32>) -> i32 {
        if state == 0 {
            return 0;
        }
        if let Some(&cached) = memo.get(&state) {
            return cached;
        }
        let mut best = m * n + 1;
        let cells = m * n;
        for cell in 0..cells {
            if (state >> cell) & 1 == 0 {
                continue;
            }
            let mut cleared = state;
            for j in 0..n {
                cleared &= !(1u32 << ((cell / n * n + j) as u32));
            }
            for i in 0..m {
                cleared &= !(1u32 << ((i * n + cell % n) as u32));
            }
            best = best.min(1 + Self::solve(cleared, m, n, memo));
        }
        memo.insert(state, best);
        best
    }
}
