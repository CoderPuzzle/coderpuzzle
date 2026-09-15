impl Solution {
    pub fn longest_common_subsequence(arrays: Vec<Vec<i32>>) -> Vec<i32> {
        // Each array is strictly increasing, so a value appears at most once
        // per array; it is common to all arrays exactly when it is counted
        // arrays.len() times. Values are bounded by 1..100, so a fixed-size
        // count array replaces the map and yields ascending order for free.
        let mut counts = [0; 101];
        for arr in &arrays {
            for &value in arr {
                counts[value as usize] += 1;
            }
        }
        (1..=100).filter(|&v| counts[v as usize] == arrays.len()).collect()
    }
}
