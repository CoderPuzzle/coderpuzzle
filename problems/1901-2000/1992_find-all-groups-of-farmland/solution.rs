use std::collections::VecDeque;

impl Solution {
    pub fn find_farmland(land: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Iterative BFS per unvisited farmland cell: flood the component and
        // track the min/max row and column, which for a rectangular group is
        // exactly its top-left and bottom-right corner.
        let (m, n) = (land.len(), land[0].len());
        let mut seen = vec![vec![false; n]; m];
        let mut groups: Vec<Vec<i32>> = Vec::new();
        let dr = [1, -1, 0, 0];
        let dc = [0, 0, 1, -1];
        for r in 0..m {
            for c in 0..n {
                if land[r][c] != 1 || seen[r][c] {
                    continue;
                }
                seen[r][c] = true;
                let mut q = VecDeque::from([(r, c)]);
                let (mut min_r, mut max_r, mut min_c, mut max_c) = (r, r, c, c);
                while let Some((cr, cc)) = q.pop_front() {
                    min_r = min_r.min(cr);
                    max_r = max_r.max(cr);
                    min_c = min_c.min(cc);
                    max_c = max_c.max(cc);
                    for d in 0..4 {
                        let (nr, nc) = (cr as isize + dr[d], cc as isize + dc[d]);
                        if 0 <= nr
                            && (nr as usize) < m
                            && 0 <= nc
                            && (nc as usize) < n
                            && land[nr as usize][nc as usize] == 1
                            && !seen[nr as usize][nc as usize]
                        {
                            seen[nr as usize][nc as usize] = true;
                            q.push_back((nr as usize, nc as usize));
                        }
                    }
                }
                groups.push(vec![min_r as i32, min_c as i32, max_r as i32, max_c as i32]);
            }
        }
        groups
    }
}
