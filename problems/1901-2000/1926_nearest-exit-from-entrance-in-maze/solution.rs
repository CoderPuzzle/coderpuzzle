use std::collections::VecDeque;

impl Solution {
    pub fn nearest_exit(maze: Vec<Vec<String>>, entrance: Vec<i32>) -> i32 {
        let m = maze.len();
        let n = maze[0].len();
        let er = entrance[0] as usize;
        let ec = entrance[1] as usize;
        // Every move costs one step, so plain BFS from the entrance visits
        // cells in order of increasing distance; dist doubles as the visited
        // set via its -1 sentinel.
        let mut dist = vec![vec![-1i32; n]; m];
        dist[er][ec] = 0;
        let mut q: VecDeque<(usize, usize)> = VecDeque::new();
        q.push_back((er, ec));
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((i, j)) = q.pop_front() {
            // Test on pop, not push: cleanly skips the entrance itself while
            // returning the correct distance for any other border cell.
            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) && (i, j) != (er, ec) {
                return dist[i][j];
            }
            for (di, dj) in dirs {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0 && (ni as usize) < m && nj >= 0 && (nj as usize) < n {
                    let (ni, nj) = (ni as usize, nj as usize);
                    if maze[ni][nj] == "." && dist[ni][nj] == -1 {
                        // Assigning distance at enqueue time is what keeps
                        // the queue ordered by distance.
                        dist[ni][nj] = dist[i][j] + 1;
                        q.push_back((ni, nj));
                    }
                }
            }
        }
        // Queue drained without dequeuing any exit: no reachable exit exists.
        -1
    }
}
