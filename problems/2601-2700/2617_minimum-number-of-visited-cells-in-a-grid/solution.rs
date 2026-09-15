use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    // Every move goes strictly right or down, so row-major order is a
    // topological order: when a cell is reached its distance is final.
    // Two lazy min-heaps answer "nearest predecessor" in O(log n):
    // rows[i] holds (dis, k) for cells settled in row i and cols[j]
    // likewise down column j. Entries whose reach no longer covers the
    // current index pop forever — the scan index only ever grows — so
    // the surviving root is the best available source from that side.
    pub fn minimum_visited_cells(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        const INFINITY: u32 = u32::MAX;
        let mut dis = vec![vec![INFINITY; n]; m];
        dis[0][0] = 1;
        let mut rows: Vec<BinaryHeap<Reverse<(u32, usize)>>> = (0..m).map(|_| BinaryHeap::new()).collect();
        let mut cols: Vec<BinaryHeap<Reverse<(u32, usize)>>> = (0..n).map(|_| BinaryHeap::new()).collect();
        rows[0].push(Reverse((1, 0)));
        cols[0].push(Reverse((1, 0)));
        for i in 0..m {
            for j in 0..n {
                if i == 0 && j == 0 {
                    continue;
                }
                while let Some(&Reverse((_, k))) = rows[i].peek() {
                    if grid[i][k] as usize + k < j {
                        rows[i].pop();
                    } else {
                        break;
                    }
                }
                while let Some(&Reverse((_, k))) = cols[j].peek() {
                    if grid[k][j] as usize + k < i {
                        cols[j].pop();
                    } else {
                        break;
                    }
                }
                let nearest = rows[i]
                    .peek()
                    .map(|&Reverse((d, _))| d)
                    .unwrap_or(INFINITY)
                    .min(cols[j].peek().map(|&Reverse((d, _))| d).unwrap_or(INFINITY));
                if nearest != INFINITY {
                    dis[i][j] = nearest + 1;
                    rows[i].push(Reverse((nearest + 1, j)));
                    cols[j].push(Reverse((nearest + 1, i)));
                }
            }
        }
        match dis[m - 1][n - 1] {
            INFINITY => -1,
            last => last as i32,
        }
    }
}
