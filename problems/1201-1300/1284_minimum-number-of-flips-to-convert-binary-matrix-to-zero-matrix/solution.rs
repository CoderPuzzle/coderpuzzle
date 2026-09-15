use std::collections::VecDeque;

impl Solution {
    pub fn min_flips(mat: Vec<Vec<i32>>) -> i32 {
        // Pack the matrix into one integer; flipping cell i XORs the state
        // with its cross-shaped flip mask. Order never matters and flipping
        // a cell twice cancels, so the reachable states form one graph per
        // start state and BFS over it gives the minimum step count.
        let m = mat.len();
        let n = mat[0].len();
        let mut start = 0usize;
        for r in 0..m {
            for c in 0..n {
                if mat[r][c] == 1 {
                    start |= 1 << (r * n + c);
                }
            }
        }
        if start == 0 {
            return 0;
        }
        let mut masks = vec![0usize; m * n];
        for r in 0..m {
            for c in 0..n {
                let mut mask = 1usize << (r * n + c);
                for (dr, dc) in [(1isize, 0isize), (-1, 0), (0, 1), (0, -1)] {
                    let (nr, nc) = (r as isize + dr, c as isize + dc);
                    if nr >= 0 && nr < m as isize && nc >= 0 && nc < n as isize {
                        mask |= 1usize << (nr as usize * n + nc as usize);
                    }
                }
                masks[r * n + c] = mask;
            }
        }
        let mut seen = vec![false; 1usize << (m * n)];
        let mut frontier: VecDeque<usize> = VecDeque::new();
        frontier.push_back(start);
        seen[start] = true;
        let mut steps = 0;
        while !frontier.is_empty() {
            steps += 1;
            for _ in 0..frontier.len() {
                let state = frontier.pop_front().unwrap();
                for &mask in &masks {
                    let nstate = state ^ mask;
                    if nstate == 0 {
                        return steps;
                    }
                    if !seen[nstate] {
                        seen[nstate] = true;
                        frontier.push_back(nstate);
                    }
                }
            }
        }
        -1
    }
}
