impl Solution {
    pub fn longest_increasing_path(matrix: Vec<Vec<i32>>) -> i32 {
        if matrix.is_empty() || matrix[0].is_empty() {
            return 0;
        }
        let m = matrix.len();
        let n = matrix[0].len();
        // memo[i][j] = longest ascending walk starting at (i, j); 0 means
        // "not computed yet".
        let mut memo = vec![vec![0i32; n]; m];
        let di = [1isize, -1, 0, 0];
        let dj = [0isize, 0, 1, -1];
        let mut best = 0i32;
        for si in 0..m {
            for sj in 0..n {
                if memo[si][sj] != 0 {
                    continue;
                }
                // The DFS call stack, made explicit: each frame is
                // (row, column, next direction). A frame pops once all
                // four directions have been explored.
                let mut stack: Vec<(usize, usize, usize)> = vec![(si, sj, 0)];
                while let Some(&(i, j, k)) = stack.last() {
                    if k == 0 {
                        // First visit: the cell on its own is a walk of 1.
                        memo[i][j] = 1;
                    }
                    if k == 4 {
                        // Every larger neighbour has been absorbed, so the
                        // frame's value is final: report it and hand it to
                        // the frame below (the cell that descended here).
                        stack.pop();
                        best = best.max(memo[i][j]);
                        if let Some(&(pi, pj, _)) = stack.last() {
                            memo[pi][pj] = memo[pi][pj].max(memo[i][j] + 1);
                        }
                        continue;
                    }
                    let ni = i as isize + di[k];
                    let nj = j as isize + dj[k];
                    stack.last_mut().unwrap().2 += 1;
                    // Only strictly larger neighbours continue the walk.
                    if ni >= 0
                        && (ni as usize) < m
                        && nj >= 0
                        && (nj as usize) < n
                        && matrix[ni as usize][nj as usize] > matrix[i][j]
                    {
                        let (ni, nj) = (ni as usize, nj as usize);
                        if memo[ni][nj] == 0 {
                            stack.push((ni, nj, 0));
                        } else {
                            // Finished earlier — its memo is final already.
                            memo[i][j] = memo[i][j].max(memo[ni][nj] + 1);
                        }
                    }
                }
            }
        }
        best
    }
}
