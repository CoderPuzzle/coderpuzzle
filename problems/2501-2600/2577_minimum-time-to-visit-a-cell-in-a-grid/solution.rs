use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_time(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        if m == 1 && n == 1 {
            return 0;
        }
        // If both neighbours of the start cell demand more than 1s we can never
        // leave the start (no adjacent cell to wait on).
        let can_right = n > 1 && grid[0][1] <= 1;
        let can_down = m > 1 && grid[1][0] <= 1;
        if !can_right && !can_down {
            return -1;
        }

        let mut dist = vec![i64::MAX; m * n];
        dist[0] = 0;
        let mut heap: BinaryHeap<(Reverse<i64>, usize)> = BinaryHeap::new();
        heap.push((Reverse(0), 0));
        let dr: [i64; 4] = [1, -1, 0, 0];
        let dc: [i64; 4] = [0, 0, 1, -1];
        while let Some((Reverse(t), idx)) = heap.pop() {
            let r = idx / n;
            let c = idx % n;
            if t != dist[idx] {
                continue;
            }
            if r == m - 1 && c == n - 1 {
                return t as i32;
            }
            for d in 0..4 {
                let nr = r as i64 + dr[d];
                let nc = c as i64 + dc[d];
                if nr < 0 || nr >= m as i64 || nc < 0 || nc >= n as i64 {
                    continue;
                }
                let nidx = (nr as usize) * n + nc as usize;
                let mut nt = t + 1;
                let g = grid[nr as usize][nc as usize] as i64;
                if nt < g {
                    if (g - nt) % 2 == 0 {
                        nt = g;
                    } else {
                        nt = g + 1;
                    }
                }
                if nt < dist[nidx] {
                    dist[nidx] = nt;
                    heap.push((Reverse(nt), nidx));
                }
            }
        }
        -1
    }
}
