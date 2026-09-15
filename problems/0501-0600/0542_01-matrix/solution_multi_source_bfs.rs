use std::collections::VecDeque;

impl Solution {
    pub fn update_matrix(mat: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = mat.len();
        let n = mat[0].len();
        let mut dist = vec![vec![-1i32; n]; m];
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        // Reverse the question: every zero broadcasts at distance 0 and the
        // first wavefront to reach a cell arrives on a shortest path.
        for i in 0..m {
            for j in 0..n {
                if mat[i][j] == 0 {
                    dist[i][j] = 0;
                    queue.push_back((i, j));
                }
            }
        }
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((i, j)) = queue.pop_front() {
            for (di, dj) in dirs {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0 && ni < m as i32 && nj >= 0 && nj < n as i32 {
                    let (ni, nj) = (ni as usize, nj as usize);
                    if dist[ni][nj] == -1 {
                        // An unset distance doubles as the visited check, and
                        // assigning before enqueueing keeps each cell queued
                        // exactly once; non-decreasing dequeue order makes the
                        // first assignment final.
                        dist[ni][nj] = dist[i][j] + 1;
                        queue.push_back((ni, nj));
                    }
                }
            }
        }
        dist
    }
}
