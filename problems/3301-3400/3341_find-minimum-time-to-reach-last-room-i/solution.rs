use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    // Waiting inside a room is free, but a move into an adjacent room
    // takes exactly one second and cannot start before the target room
    // opens, so a cell settled at time t settles a neighbour at
    // max(t, moveTime[next]) + 1. That relaxation never lowers a settled
    // time, so this is shortest-path terrain for Dijkstra: pop cells
    // from a min-heap of arrival times, skip stale entries, and the
    // first settle of a cell is its final time.
    pub fn min_time_to_reach(moveTime: Vec<Vec<i32>>) -> i32 {
        let n = moveTime.len();
        let m = moveTime[0].len();
        const INFINITY: i32 = i32::MAX;
        let mut dist = vec![vec![INFINITY; m]; n];
        dist[0][0] = 0;
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((0i32, 0usize, 0usize)));
        while let Some(Reverse((t, i, j))) = heap.pop() {
            if t > dist[i][j] {
                continue;
            }
            for (di, dj) in [(-1i64, 0i64), (1, 0), (0, -1), (0, 1)] {
                let ni = i as i64 + di;
                let nj = j as i64 + dj;
                if ni < 0 || nj < 0 || ni >= n as i64 || nj >= m as i64 {
                    continue;
                }
                let (ni, nj) = (ni as usize, nj as usize);
                let nt = t.max(moveTime[ni][nj]) + 1;
                if nt < dist[ni][nj] {
                    dist[ni][nj] = nt;
                    heap.push(Reverse((nt, ni, nj)));
                }
            }
        }
        dist[n - 1][m - 1]
    }
}
