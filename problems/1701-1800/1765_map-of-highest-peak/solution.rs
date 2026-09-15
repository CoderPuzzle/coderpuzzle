use std::collections::VecDeque;

impl Solution {
    pub fn highest_peak(is_water: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = is_water.len();
        let n = is_water[0].len();
        // Optimal height = distance to the nearest water: the two rules cap
        // every cell there, and assigning exactly that maximizes all cells
        // at once (neighboring distances differ by at most 1).
        let mut height = vec![vec![-1i32; n]; m];
        let mut q: VecDeque<(usize, usize)> = VecDeque::new();
        // Multi-source BFS: every water cell starts at height 0; each BFS
        // ring is one step farther from some water cell.
        for i in 0..m {
            for j in 0..n {
                if is_water[i][j] == 1 {
                    height[i][j] = 0;
                    q.push_back((i, j));
                }
            }
        }
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((i, j)) = q.pop_front() {
            for (di, dj) in dirs {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0 && (ni as usize) < m && nj >= 0 && (nj as usize) < n {
                    let (ni, nj) = (ni as usize, nj as usize);
                    // height == -1 doubles as the visited marker, so each
                    // cell is enqueued once, by its nearest source.
                    if height[ni][nj] == -1 {
                        height[ni][nj] = height[i][j] + 1;
                        q.push_back((ni, nj));
                    }
                }
            }
        }
        height
    }
}
