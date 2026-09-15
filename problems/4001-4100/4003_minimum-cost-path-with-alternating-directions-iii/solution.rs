use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_cost(m: i32, n: i32, penalty: Vec<Vec<i32>>) -> i64 {
        let m = m as usize;
        let n = n as usize;
        let size = m * n;
        let inf = i64::MAX / 4;
        let mut dist = vec![[inf; 2]; size];
        dist[0][0] = 1; // entrance cost of (0, 0); next action is odd
        let mut pq: BinaryHeap<Reverse<(i64, usize, usize)>> = BinaryHeap::new();
        pq.push(Reverse((1, 0, 0)));
        let target = size - 1;
        let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some(Reverse((cost, cell, parity))) = pq.pop() {
            if cost > dist[cell][parity] {
                continue;
            }
            if cell == target {
                continue;
            }
            let i = cell / n;
            let j = cell % n;
            let is_odd = parity == 0;
            for (di, dj) in dirs {
                let ni = i as i64 + di;
                let nj = j as i64 + dj;
                if !(ni >= 0 && ni < m as i64 && nj >= 0 && nj < n as i64) {
                    continue;
                }
                let (ni, nj) = (ni as usize, nj as usize);
                let follows = (is_odd && di + dj > 0) || (!is_odd && di + dj < 0);
                let mut w = (ni as i64 + 1) * (nj as i64 + 1);
                if !follows {
                    w += penalty[i][j] as i64;
                }
                let ncell = ni * n + nj;
                let nparity = 1 - parity;
                let nc = cost + w;
                if nc < dist[ncell][nparity] {
                    dist[ncell][nparity] = nc;
                    pq.push(Reverse((nc, ncell, nparity)));
                }
            }
            // wait flips parity at cost penalty[i][j]
            let w = penalty[i][j] as i64;
            let nparity = 1 - parity;
            let nc = cost + w;
            if nc < dist[cell][nparity] {
                dist[cell][nparity] = nc;
                pq.push(Reverse((nc, cell, nparity)));
            }
        }
        dist[target][0].min(dist[target][1])
    }
}
