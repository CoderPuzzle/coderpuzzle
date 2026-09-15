use std::collections::VecDeque;

impl Solution {
    pub fn pacific_atlantic(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();

        // Reverse the flow: walk inland from the ocean border instead of
        // downhill from every cell, so one traversal finds all draining cells.
        fn reachable(heights: &[Vec<i32>], m: usize, n: usize, border: Vec<(usize, usize)>) -> Vec<Vec<bool>> {
            let mut seen = vec![vec![false; n]; m];
            let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
            for cell in border {
                if !seen[cell.0][cell.1] {
                    seen[cell.0][cell.1] = true;
                }
                queue.push_back(cell);
            }
            let dirs = [
                (1usize, 0usize),
                (0usize.wrapping_sub(1), 0),
                (0, 1),
                (0, 0usize.wrapping_sub(1)),
            ];
            while let Some((r, c)) = queue.pop_front() {
                for (dr, dc) in dirs {
                    let nr = (r as isize + dr as isize) as usize;
                    let nc = (c as isize + dc as isize) as usize;
                    // Only a neighbor at least as tall could have flowed down
                    // into (r, c).
                    if nr < m && nc < n && !seen[nr][nc] && heights[nr][nc] >= heights[r][c] {
                        // Mark on enqueue so each cell enters the queue at most once.
                        seen[nr][nc] = true;
                        queue.push_back((nr, nc));
                    }
                }
            }
            seen
        }

        // Pacific seeds: top row + left column; Atlantic: bottom row + right
        // column. Corners appear in both seed lists.
        let mut pacific_border: Vec<(usize, usize)> = Vec::new();
        for c in 0..n {
            pacific_border.push((0, c));
        }
        for r in 0..m {
            pacific_border.push((r, 0));
        }
        let mut atlantic_border: Vec<(usize, usize)> = Vec::new();
        for c in 0..n {
            atlantic_border.push((m - 1, c));
        }
        for r in 0..m {
            atlantic_border.push((r, n - 1));
        }

        let pacific = reachable(&heights, m, n, pacific_border);
        let atlantic = reachable(&heights, m, n, atlantic_border);

        // Row-major intersection of the two reachable sets comes out sorted.
        let mut result: Vec<Vec<i32>> = Vec::new();
        for r in 0..m {
            for c in 0..n {
                if pacific[r][c] && atlantic[r][c] {
                    result.push(vec![r as i32, c as i32]);
                }
            }
        }
        result
    }
}
