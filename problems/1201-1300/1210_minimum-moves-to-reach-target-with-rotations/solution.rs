use std::collections::VecDeque;

impl Solution {
    pub fn minimum_moves(grid: Vec<Vec<i32>>) -> i32 {
        // State (r, c, horizontal): (r, c) is the upper-left occupied cell;
        // horizontal snakes occupy (r,c) and (r,c+1), vertical (r,c),(r+1,c).
        let n = grid.len();
        let mut queue: VecDeque<(usize, usize, usize, usize)> = VecDeque::new();
        let mut visited = vec![false; n * n * 2 + 2];
        queue.push_back((0, 0, 1, 0));
        visited[0 * n + 0 * 2 + 1] = true;
        while let Some((r, c, horizontal, moves)) = queue.pop_front() {
            if r == n - 1 && c == n - 2 && horizontal == 1 {
                return moves as i32;
            }
            if horizontal == 1 {
                // Slide right: the new head cell must be empty.
                if c + 2 < n && grid[r][c + 2] == 0 && !visited[r * n + (c + 1) * 2 + 1] {
                    visited[r * n + (c + 1) * 2 + 1] = true;
                    queue.push_back((r, c + 1, 1, moves + 1));
                }
                // Slide down: both cells of the new row must be empty.
                if r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0 && !visited[(r + 1) * n + c * 2 + 1] {
                    visited[(r + 1) * n + c * 2 + 1] = true;
                    queue.push_back((r + 1, c, 1, moves + 1));
                }
                // Rotate clockwise: the two cells under the snake must be empty.
                if r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0 && !visited[r * n + c * 2] {
                    visited[r * n + c * 2] = true;
                    queue.push_back((r, c, 0, moves + 1));
                }
            } else {
                // Slide right: both cells of the new column must be empty.
                if c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0 && !visited[r * n + (c + 1) * 2] {
                    visited[r * n + (c + 1) * 2] = true;
                    queue.push_back((r, c + 1, 0, moves + 1));
                }
                // Slide down: the new tail cell must be empty.
                if r + 2 < n && grid[r + 2][c] == 0 && !visited[(r + 1) * n + c * 2] {
                    visited[(r + 1) * n + c * 2] = true;
                    queue.push_back((r + 1, c, 0, moves + 1));
                }
                // Rotate counterclockwise: the two cells to the right must be empty.
                if c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0 && !visited[r * n + c * 2 + 1] {
                    visited[r * n + c * 2 + 1] = true;
                    queue.push_back((r, c, 1, moves + 1));
                }
            }
        }
        -1
    }
}
