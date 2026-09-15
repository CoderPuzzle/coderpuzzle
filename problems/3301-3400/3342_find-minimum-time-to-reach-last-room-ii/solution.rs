use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    // Every move flips the parity of i + j, so a walk that has made k
    // moves always stands on a cell with the parity of k — the hint's
    // (cell, move-parity) states collapse onto the cells alone, and the
    // move leaving (i, j) costs 1 when (i + j) is even, else 2. That
    // fixes each cell's outgoing cost, so plain Dijkstra applies: a
    // cell settled at time t offers a neighbour arrival
    // max(t, moveTime[next]) + cost_out(cell), and the first settle is
    // final. Distances are carried in 64-bit i64s — moveTime reaches
    // 1e9 and the move sums add ~3000.
    pub fn min_time_to_reach(moveTime: Vec<Vec<i32>>) -> i32 {
        let n = moveTime.len();
        let m = moveTime[0].len();
        const INFINITY: i64 = i64::MAX;
        let mut dist = vec![vec![INFINITY; m]; n];
        dist[0][0] = 0;
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((0i64, 0usize, 0usize)));
        while let Some(Reverse((t, i, j))) = heap.pop() {
            if t > dist[i][j] {
                continue;
            }
            let step: i64 = if (i + j) % 2 == 0 { 1 } else { 2 };
            for (di, dj) in [(-1i64, 0i64), (1, 0), (0, -1), (0, 1)] {
                let ni = i as i64 + di;
                let nj = j as i64 + dj;
                if ni < 0 || nj < 0 || ni >= n as i64 || nj >= m as i64 {
                    continue;
                }
                let (ni, nj) = (ni as usize, nj as usize);
                let nt = t.max(moveTime[ni][nj] as i64) + step;
                if nt < dist[ni][nj] {
                    dist[ni][nj] = nt;
                    heap.push(Reverse((nt, ni, nj)));
                }
            }
        }
        dist[n - 1][m - 1] as i32
    }
}
