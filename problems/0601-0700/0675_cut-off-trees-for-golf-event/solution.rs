use std::collections::VecDeque;

impl Solution {
    pub fn cut_off_tree(forest: Vec<Vec<i32>>) -> i32 {
        // The order is not a choice: the trees must fall shortest to tallest.
        // What is left to plan is only the walk between consecutive trees,
        // and each of those legs is an unweighted shortest path — a plain
        // BFS. Cutting a tree rewrites its cell to 1, which is still
        // walkable, so every leg can search the original forest unchanged.
        let mut trees: Vec<(i32, usize, usize)> = Vec::new();
        for (row, line) in forest.iter().enumerate() {
            for (col, &height) in line.iter().enumerate() {
                if height > 1 {
                    trees.push((height, row, col));
                }
            }
        }
        trees.sort_unstable();
        let mut total = 0;
        let (mut row, mut col) = (0usize, 0usize);
        for &(_, target_row, target_col) in &trees {
            match Self::walk(&forest, row, col, target_row, target_col) {
                Some(steps) => total += steps,
                // One unreachable tree strands the whole event: there is no
                // order in which every tree gets cut.
                None => return -1,
            }
            row = target_row;
            col = target_col;
        }
        total
    }

    fn walk(
        forest: &[Vec<i32>],
        start_row: usize,
        start_col: usize,
        target_row: usize,
        target_col: usize,
    ) -> Option<i32> {
        // A wall under the walker means the leg never begins; only the
        // initial (0, 0) can actually be a 0 cell.
        if forest[start_row][start_col] == 0 {
            return None;
        }
        if start_row == target_row && start_col == target_col {
            return Some(0);
        }
        let rows = forest.len() as i32;
        let cols = forest[0].len() as i32;
        let mut pending: VecDeque<(i32, i32)> = VecDeque::new();
        let mut distance = vec![vec![-1; cols as usize]; rows as usize];
        distance[start_row][start_col] = 0;
        pending.push_back((start_row as i32, start_col as i32));
        let dr = [-1, 1, 0, 0];
        let dc = [0, 0, -1, 1];
        while let Some((row, col)) = pending.pop_front() {
            let near = distance[row as usize][col as usize] + 1;
            for d in 0..4 {
                let r = row + dr[d];
                let c = col + dc[d];
                // `inside` short-circuits the indexing; trees and empty
                // cells are both walkable, only 0 is not.
                let inside = r >= 0 && r < rows && c >= 0 && c < cols;
                if !inside || forest[r as usize][c as usize] == 0 || distance[r as usize][c as usize] >= 0 {
                    continue;
                }
                if r == target_row as i32 && c == target_col as i32 {
                    return Some(near);
                }
                distance[r as usize][c as usize] = near;
                pending.push_back((r, c));
            }
        }
        None
    }
}
