use std::collections::VecDeque;

impl Solution {
    pub fn shortest_distance(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        // One BFS per building, not per empty cell: each search floods the
        // empty region once, and every empty cell accumulates its distance
        // from that building plus a count of buildings that reached it.
        // Cells are flattened to r * n + c so the sums, counts, and queue
        // are plain Vec<i32>.
        let mut dist_sum = vec![0i32; m * n];
        let mut reach = vec![0i32; m * n];
        let moves: [(isize, isize); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        let mut buildings = 0;
        for br in 0..m {
            for bc in 0..n {
                if grid[br][bc] != 1 {
                    continue;
                }
                buildings += 1;
                // BFS starts at the building itself; buildings and obstacles
                // are impassable, so the search only ever walks into empty
                // land and stops where another building blocks the way.
                let mut step = vec![-1i32; m * n];
                step[br * n + bc] = 0;
                let mut queue: VecDeque<usize> = VecDeque::new();
                queue.push_back(br * n + bc);
                while let Some(pos) = queue.pop_front() {
                    let (r, c) = (pos / n, pos % n);
                    for (dr, dc) in moves {
                        let nr = r as isize + dr;
                        let nc = c as isize + dc;
                        if nr < 0 || nr >= m as isize || nc < 0 || nc >= n as isize {
                            continue;
                        }
                        let npos = nr as usize * n + nc as usize;
                        if grid[nr as usize][nc as usize] != 0 || step[npos] >= 0 {
                            continue;
                        }
                        step[npos] = step[pos] + 1;
                        dist_sum[npos] += step[npos];
                        reach[npos] += 1;
                        queue.push_back(npos);
                    }
                }
            }
        }
        // A house site must reach EVERY building — a cell sealed off from one
        // building is invalid no matter how short its other distances are.
        let mut best: i32 = -1;
        for r in 0..m {
            for c in 0..n {
                let pos = r * n + c;
                if grid[r][c] == 0 && reach[pos] == buildings && (best < 0 || dist_sum[pos] < best) {
                    best = dist_sum[pos];
                }
            }
        }
        best
    }
}
