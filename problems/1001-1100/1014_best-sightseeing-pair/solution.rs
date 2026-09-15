impl Solution {
    pub fn max_score_sightseeing_pair(values: Vec<i32>) -> i32 {
        let mut best_prefix = values[0]; // max of values[i] + i seen so far
        let mut best = i32::MIN;
        for j in 1..values.len() {
            let score = best_prefix + values[j] - j as i32;
            if score > best {
                best = score;
            }
            if values[j] + j as i32 > best_prefix {
                best_prefix = values[j] + j as i32;
            }
        }
        best
    }
}
