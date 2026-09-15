// Scan row-major for the first island and flood it iteratively to collect
// its cells; then grow a multi-source BFS outward over the water, one layer
// per flipped 0, until the second island is touched. Iterating rather than
// recursing is the point — an island can snake through most of a 100 x 100
// grid, chaining thousands of cells deep, far past any call stack a
// submission is granted.
impl Solution {
    pub fn shortest_bridge(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let mut seen = vec![false; n * n];
        // Cells packed as r * n + c in one flat queue, spanning both phases.
        let mut queue: Vec<usize> = Vec::with_capacity(n * n);
        let mut head = 0;
        'outer: for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 1 {
                    seen[i * n + j] = true;
                    queue.push(i * n + j);
                    break 'outer;
                }
            }
        }
        // A cell is marked when it enters the queue, never when it leaves,
        // so no cell is ever enqueued twice.
        while head < queue.len() {
            let cell = queue[head];
            head += 1;
            let r = cell / n;
            let c = cell % n;
            if r > 0 && grid[r - 1][c] == 1 && !seen[cell - n] {
                seen[cell - n] = true;
                queue.push(cell - n);
            }
            if r + 1 < n && grid[r + 1][c] == 1 && !seen[cell + n] {
                seen[cell + n] = true;
                queue.push(cell + n);
            }
            if c > 0 && grid[r][c - 1] == 1 && !seen[cell - 1] {
                seen[cell - 1] = true;
                queue.push(cell - 1);
            }
            if c + 1 < n && grid[r][c + 1] == 1 && !seen[cell + 1] {
                seen[cell + 1] = true;
                queue.push(cell + 1);
            }
        }
        // The flood-filled prefix of the queue is BFS layer 0; each further
        // layer is exactly the set of water cells one more flip away, and
        // the first unvisited land met is island 2.
        let mut flips = 0;
        head = 0; // replay the island-1 prefix as BFS layer 0
        let mut layer_end = queue.len();
        while head < layer_end {
            let mut next_end = layer_end;
            while head < layer_end {
                let cell = queue[head];
                head += 1;
                let r = cell / n;
                let c = cell % n;
                if r > 0 && !seen[cell - n] {
                    if grid[r - 1][c] == 1 {
                        return flips;
                    }
                    seen[cell - n] = true;
                    queue.push(cell - n);
                    next_end += 1;
                }
                if r + 1 < n && !seen[cell + n] {
                    if grid[r + 1][c] == 1 {
                        return flips;
                    }
                    seen[cell + n] = true;
                    queue.push(cell + n);
                    next_end += 1;
                }
                if c > 0 && !seen[cell - 1] {
                    if grid[r][c - 1] == 1 {
                        return flips;
                    }
                    seen[cell - 1] = true;
                    queue.push(cell - 1);
                    next_end += 1;
                }
                if c + 1 < n && !seen[cell + 1] {
                    if grid[r][c + 1] == 1 {
                        return flips;
                    }
                    seen[cell + 1] = true;
                    queue.push(cell + 1);
                    next_end += 1;
                }
            }
            layer_end = next_end;
            flips += 1;
        }
        flips
    }
}
