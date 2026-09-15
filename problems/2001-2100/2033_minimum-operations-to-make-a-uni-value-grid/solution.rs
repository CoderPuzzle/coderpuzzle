impl Solution {
    pub fn min_operations(grid: Vec<Vec<i32>>, x: i32) -> i32 {
        let mut values: Vec<i32> = grid.into_iter().flatten().collect();
        let remainder = values[0] % x;
        if values.iter().any(|&value| value % x != remainder) {
            return -1;
        }

        values.sort_unstable();
        let median = values[values.len() / 2] as i64;
        let operations: i64 = values
            .iter()
            .map(|&value| (value as i64 - median).abs() / x as i64)
            .sum();
        operations as i32
    }
}
