impl Solution {
    pub fn minimum_index(capacity: Vec<i32>, item_size: i32) -> i32 {
        // The earliest index wins ties, so only a strictly smaller
        // fitting capacity replaces the current best.
        let mut best_index = -1;
        let mut best_capacity = i32::MAX;
        for (i, &c) in capacity.iter().enumerate() {
            if c >= item_size && c < best_capacity {
                best_capacity = c;
                best_index = i as i32;
            }
        }
        best_index
    }
}
