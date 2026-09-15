use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn trap_rain_water(height_map: Vec<Vec<i32>>) -> i32 {
        let m = height_map.len();
        let n = height_map[0].len();
        let mut visited = vec![vec![false; n]; m];
        let mut heap: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();
        // Water spills off the map at the border, so the frontier starts as
        // the whole border ring.
        for i in 0..m {
            for j in 0..n {
                if i == 0 || i == m - 1 || j == 0 || j == n - 1 {
                    heap.push(Reverse((height_map[i][j], i, j)));
                    visited[i][j] = true;
                }
            }
        }
        let mut water: i64 = 0;
        while let Some(Reverse((h, i, j))) = heap.pop() {
            // h is the frontier minimum: no undiscovered cell can hold water
            // above h, since any escape path crosses the frontier at >= h.
            for (di, dj) in [(-1i32, 0i32), (1, 0), (0, -1), (0, 1)] {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0 && nj >= 0 && (ni as usize) < m && (nj as usize) < n {
                    let (ni, nj) = (ni as usize, nj as usize);
                    if !visited[ni][nj] {
                        visited[ni][nj] = true;
                        let nh = height_map[ni][nj];
                        if nh < h {
                            // Lower neighbor settles now, filled up to level h.
                            water += (h - nh) as i64;
                        }
                        // Push max(h, nh): entries carry the effective
                        // water-plus-terrain level, the running spill level.
                        heap.push(Reverse((h.max(nh), ni, nj)));
                    }
                }
            }
        }
        water as i32
    }
}
