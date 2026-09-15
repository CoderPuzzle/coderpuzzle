impl Solution {
    pub fn min_number_operations(target: Vec<i32>) -> i32 {
        // Each operation is one horizontal layer of the final profile, and
        // the first target[0] layers must all span index 0.
        let mut ops: i64 = target[0] as i64;
        for i in 1..target.len() {
            // The profile can only rise where a new operation starts, so pay
            // each positive rise; descents are free because earlier layers
            // can simply stop before index i.
            if target[i] > target[i - 1] {
                ops += (target[i] - target[i - 1]) as i64;
            }
        }
        ops as i32
    }
}
