use std::collections::VecDeque;

impl Solution {
    pub fn has_path(maze: Vec<Vec<i32>>, start: Vec<i32>, destination: Vec<i32>) -> bool {
        let rows = maze.len() as i32;
        let cols = maze[0].len() as i32;
        // The ball begins at rest, so the start cell is itself a stopping
        // position and seeds the queue.
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        let mut stopped = vec![vec![false; cols as usize]; rows as usize];
        queue.push_back((start[0], start[1]));
        stopped[start[0] as usize][start[1] as usize] = true;
        let dr = [-1, 1, 0, 0];
        let dc = [0, 0, -1, 1];
        while let Some((row, col)) = queue.pop_front() {
            if row == destination[0] && col == destination[1] {
                return true;
            }
            // A roll is deterministic, so each stop has at most four
            // successors — the rest cells of its four rolls — and every
            // one of them is scheduled exactly once.
            for d in 0..4 {
                let (r, c) = Self::roll(&maze, rows, cols, row, col, dr[d], dc[d]);
                if !stopped[r as usize][c as usize] {
                    stopped[r as usize][c as usize] = true;
                    queue.push_back((r, c));
                }
            }
        }
        false
    }

    fn roll(maze: &[Vec<i32>], rows: i32, cols: i32, mut row: i32, mut col: i32, dr: i32, dc: i32) -> (i32, i32) {
        // The border acts as a wall, so leaving the grid ends the roll
        // just like a 1 cell does; `blocked` guards the indexing below.
        loop {
            let next_row = row + dr;
            let next_col = col + dc;
            let blocked = next_row < 0 || next_row >= rows || next_col < 0 || next_col >= cols;
            if blocked || maze[next_row as usize][next_col as usize] == 1 {
                break;
            }
            row = next_row;
            col = next_col;
        }
        (row, col)
    }
}
