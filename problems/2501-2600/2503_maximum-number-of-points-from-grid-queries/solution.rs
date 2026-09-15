use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn max_points(grid: Vec<Vec<i32>>, queries: Vec<i32>) -> Vec<i32> {
        let m = grid.len();
        let n = grid[0].len();
        let qlen = queries.len();
        // A query q scores exactly the cells reachable from (0,0) through
        // values < q; that set only grows with q, so answer queries in
        // ascending order against one shared frontier.
        let mut order: Vec<usize> = (0..qlen).collect();
        order.sort_by_key(|&i| queries[i]);
        let mut answer = vec![0i32; qlen];
        let mut visited = vec![vec![false; n]; m];
        visited[0][0] = true;
        // Min-heap frontier keyed by cell value; the start cell is marked
        // visited up front so it must be earned by the pop loop like any other.
        let mut heap: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();
        heap.push(Reverse((grid[0][0], 0usize, 0usize)));
        let mut count: i32 = 0;
        for idx in order {
            let q = queries[idx];
            // Pop while the cheapest frontier cell is strictly below q: this
            // is Dijkstra-like expansion in value order, one point per cell.
            while let Some(&Reverse((val, r, c))) = heap.peek() {
                if val >= q {
                    break;
                }
                heap.pop();
                count += 1;
                let nb = [(r + 1, c), (r.wrapping_sub(1), c), (r, c + 1), (r, c.wrapping_sub(1))];
                for (nr, nc) in nb {
                    if nr < m && nc < n && !visited[nr][nc] {
                        // Mark at push time: no duplicate entries, so each
                        // cell enters and leaves the heap exactly once.
                        visited[nr][nc] = true;
                        heap.push(Reverse((grid[nr][nc], nr, nc)));
                    }
                }
            }
            // Heap min >= q (or empty): nothing further is reachable for this
            // or any smaller remaining query, so the running count answers it.
            answer[idx] = count;
        }
        answer
    }
}
