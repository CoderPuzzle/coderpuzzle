impl Solution {
    pub fn minimize_array_value(nums: Vec<i32>) -> i32 {
        // Value only moves leftward, so each prefix's max is at least its
        // ceiling average; the max over all prefixes is also achievable by
        // balancing each prefix to that ceiling.
        let mut total: i64 = 0;
        let mut best: i64 = 0;
        for (i, &value) in nums.iter().enumerate() {
            total += value as i64;
            // ceil(total / (i+1)) via integer arithmetic.
            let candidate = (total + i as i64) / (i as i64 + 1);
            if candidate > best {
                best = candidate;
            }
        }
        best as i32
    }
}
