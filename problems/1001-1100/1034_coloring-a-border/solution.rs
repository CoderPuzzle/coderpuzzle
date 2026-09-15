// Identify the whole connected component first (BFS with an explicit
// queue — depth safety), classifying each member's border status against
// the ORIGINAL grid values. Only after every member has been classified
// does a second pass repaint the collected border cells, so an
// in-progress repaint can never corrupt a later cell's neighbor check.
impl Solution {
    pub fn color_border(mut grid: Vec<Vec<i32>>, row: i32, col: i32, color: i32) -> Vec<Vec<i32>> {
        let m = grid.len();
        let n = grid[0].len();
        let (row, col) = (row as usize, col as usize);
        let original = grid[row][col];
        let mut visited = vec![false; m * n];
        let mut queue: Vec<usize> = Vec::with_capacity(m * n);
        let mut border: Vec<usize> = Vec::with_capacity(m * n);
        visited[row * n + col] = true;
        queue.push(row * n + col);
        let mut head = 0;
        while head < queue.len() {
            let cell = queue[head];
            head += 1;
            let r = cell / n;
            let c = cell % n;
            let mut is_border = r == 0 || r == m - 1 || c == 0 || c == n - 1;
            if r > 0 {
                if grid[r - 1][c] != original {
                    is_border = true;
                } else if !visited[cell - n] {
                    visited[cell - n] = true;
                    queue.push(cell - n);
                }
            }
            if r + 1 < m {
                if grid[r + 1][c] != original {
                    is_border = true;
                } else if !visited[cell + n] {
                    visited[cell + n] = true;
                    queue.push(cell + n);
                }
            }
            if c > 0 {
                if grid[r][c - 1] != original {
                    is_border = true;
                } else if !visited[cell - 1] {
                    visited[cell - 1] = true;
                    queue.push(cell - 1);
                }
            }
            if c + 1 < n {
                if grid[r][c + 1] != original {
                    is_border = true;
                } else if !visited[cell + 1] {
                    visited[cell + 1] = true;
                    queue.push(cell + 1);
                }
            }
            if is_border {
                border.push(cell);
            }
        }
        for cell in border {
            grid[cell / n][cell % n] = color;
        }
        grid
    }
}
