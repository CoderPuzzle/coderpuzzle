impl Solution {
    pub fn good_subset_of_binary_matrix(grid: Vec<Vec<i32>>) -> Vec<i32> {
        // Each row collapses into an n-bit signature (n <= 5 means at most
        // 32 of them). An all-zero row by itself is a good subset; otherwise
        // the earliest previously stored signature disjoint from the current
        // row completes a size-2 good subset.
        let mut seen = std::collections::HashMap::new();
        for i in 0..grid.len() {
            let mut mask = 0i32;
            for j in 0..grid[i].len() {
                if grid[i][j] == 1 {
                    mask |= 1 << j;
                }
            }
            if mask == 0 {
                return vec![i as i32];
            }
            for other in 0..32 {
                if let Some(&first) = seen.get(&other) {
                    if (other & mask) == 0 {
                        return vec![first, i as i32];
                    }
                }
            }
            seen.entry(mask).or_insert(i as i32);
        }
        Vec::new()
    }
}
