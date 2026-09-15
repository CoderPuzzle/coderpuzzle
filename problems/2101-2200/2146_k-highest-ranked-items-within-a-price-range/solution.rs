use std::collections::VecDeque;

impl Solution {
    pub fn highest_ranked_k_items(grid: Vec<Vec<i32>>, pricing: Vec<i32>, start: Vec<i32>, k: i32) -> Vec<Vec<i32>> {
        let rows = grid.len();
        let columns = grid[0].len();
        let mut distance = vec![vec![-1; columns]; rows];
        let start_row = start[0] as usize;
        let start_column = start[1] as usize;
        let mut queue = VecDeque::new();
        queue.push_back((start_row, start_column));
        distance[start_row][start_column] = 0;

        let mut candidates = Vec::new();
        let directions = [(1_isize, 0_isize), (-1, 0), (0, 1), (0, -1)];

        while let Some((row, column)) = queue.pop_front() {
            let price = grid[row][column];
            if pricing[0] <= price && price <= pricing[1] {
                candidates.push((distance[row][column], price, row, column));
            }

            for &(row_change, column_change) in &directions {
                let next_row = row as isize + row_change;
                let next_column = column as isize + column_change;
                if next_row >= 0 && next_row < rows as isize && next_column >= 0 && next_column < columns as isize {
                    let next_row = next_row as usize;
                    let next_column = next_column as usize;
                    if grid[next_row][next_column] != 0 && distance[next_row][next_column] == -1 {
                        distance[next_row][next_column] = distance[row][column] + 1;
                        queue.push_back((next_row, next_column));
                    }
                }
            }
        }

        candidates.sort_unstable();
        candidates
            .into_iter()
            .take(k as usize)
            .map(|(_, _, row, column)| vec![row as i32, column as i32])
            .collect()
    }
}
