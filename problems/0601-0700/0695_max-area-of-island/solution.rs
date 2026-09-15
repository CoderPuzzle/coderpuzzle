// Sweep row-major: every island is discovered exactly once, at the first
// cell the scan meets, and counted by flooding it with an explicit queue.
// Iterating rather than recursing is the point — a snake-shaped island at
// the bound chains thousands of cells deep, far past any call stack a
// submission is granted.
impl Solution {
    pub fn max_area_of_island(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut seen = vec![false; m * n];
        // Cells packed as r * n + c in one flat queue, reused per island.
        let mut queue: Vec<usize> = Vec::with_capacity(m * n);
        let mut best = 0;
        for i in 0..m {
            for j in 0..n {
                if grid[i][j] != 1 || seen[i * n + j] {
                    continue;
                }
                seen[i * n + j] = true;
                queue.clear();
                queue.push(i * n + j);
                let mut area = 0;
                let mut head = 0;
                // A cell is marked when it enters the queue, never when it
                // leaves, so no cell is ever enqueued twice.
                while head < queue.len() {
                    let cell = queue[head];
                    head += 1;
                    let r = cell / n;
                    let c = cell % n;
                    area += 1;
                    if r > 0 && grid[r - 1][c] == 1 && !seen[cell - n] {
                        seen[cell - n] = true;
                        queue.push(cell - n);
                    }
                    if r + 1 < m && grid[r + 1][c] == 1 && !seen[cell + n] {
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
                best = best.max(area);
            }
        }
        best as i32
    }
}
