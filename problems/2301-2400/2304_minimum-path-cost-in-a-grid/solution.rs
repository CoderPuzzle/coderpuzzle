impl Solution {
    pub fn min_path_cost(grid: Vec<Vec<i32>>, moveCost: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let columns = grid[0].len();
        let mut costs = grid[0].clone();
        for row in 1..rows {
            let previous = &grid[row - 1];
            let current = &grid[row];
            let mut next = Vec::with_capacity(columns);
            for column in 0..columns {
                let mut best = i32::MAX;
                for source in 0..columns {
                    let candidate = costs[source] + moveCost[previous[source] as usize][column];
                    best = best.min(candidate);
                }
                next.push(best + current[column]);
            }
            costs = next;
        }
        costs.into_iter().min().unwrap()
    }
}
