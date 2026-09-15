use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_cost(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        let di: [i32; 4] = [0, 0, 1, -1];
        let dj: [i32; 4] = [1, -1, 0, 0];
        let mut dist = vec![vec![i32::MAX; n as usize]; m as usize];
        dist[0][0] = 0;
        // Shortest path over cells: each move costs 0 when the cell's sign
        // points at that neighbor and 1 otherwise (the price of rewriting it).
        // Plain Dijkstra: a binary heap yields the smallest tentative distance
        // on every pop, whatever the weights are.
        let mut heap: BinaryHeap<Reverse<(i32, i32, i32)>> = BinaryHeap::new();
        heap.push(Reverse((0, 0, 0)));
        while let Some(Reverse((d, i, j))) = heap.pop() {
            // The first pop of a cell settles its distance for good.
            if i == m - 1 && j == n - 1 {
                return d;
            }
            // Stale-entry guard: skip outdated heap records.
            if d > dist[i as usize][j as usize] {
                continue;
            }
            for s in 1..=4i32 {
                let ni = i + di[(s - 1) as usize];
                let nj = j + dj[(s - 1) as usize];
                // Bounds check drops signs pointing off the grid.
                if ni >= 0 && ni < m && nj >= 0 && nj < n {
                    let cost = if grid[i as usize][j as usize] == s { 0 } else { 1 };
                    // Relax only when the rewrite price strictly improves.
                    if d + cost < dist[ni as usize][nj as usize] {
                        dist[ni as usize][nj as usize] = d + cost;
                        heap.push(Reverse((d + cost, ni, nj)));
                    }
                }
            }
        }
        dist[(m - 1) as usize][(n - 1) as usize]
    }
}
