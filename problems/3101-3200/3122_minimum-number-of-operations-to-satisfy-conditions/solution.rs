impl Solution {
    pub fn minimum_operations(grid: Vec<Vec<i32>>) -> i32 {
        // Vertical equality makes each column one constant value;
        // horizontal inequality only links adjacent columns. dp[v] =
        // cheapest total for processed columns ending with value v,
        // extended over the ten digits that grid cells may hold.
        let rows = grid.len() as i32;
        let columns = grid[0].len();
        let mut previous = [0_i32; 10];
        for j in 0..columns {
            let mut counts = [0_usize; 10];
            for row in &grid {
                counts[row[j] as usize] += 1;
            }
            let mut current = [0_i32; 10];
            for value in 0..10usize {
                let mut best_prev = i32::MAX;
                for k in 0..10usize {
                    if k != value && previous[k] < best_prev {
                        best_prev = previous[k];
                    }
                }
                current[value] = rows - counts[value] as i32 + best_prev;
            }
            previous = current;
        }
        previous.iter().copied().min().unwrap()
    }
}
