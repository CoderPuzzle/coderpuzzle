use std::collections::HashMap;

impl Solution {
    pub fn count_stable_subarrays(capacity: Vec<i32>) -> i64 {
        let n = capacity.len();
        // Prefix sums reach n * 10^9 = 10^14, well past 32 bits, so they
        // accumulate in 64-bit integers even though each element fits.
        let mut prefix = vec![0i64; n];
        prefix[0] = capacity[0] as i64;
        for i in 1..n {
            prefix[i] = prefix[i - 1] + capacity[i] as i64;
        }
        // With p the inclusive prefix sums, [l, r] is stable exactly when
        // (capacity[l], p[l]) equals (capacity[r], p[r - 1] - capacity[r]):
        // equal boundary values, and an interior sum that reduces to plain
        // prefix equality. Tuples hash natively, so the pair is the key.
        let mut seen: HashMap<(i64, i64), i64> = HashMap::new();
        let mut count = 0i64;
        for r in 2..n {
            let left = r - 2;
            *seen.entry((capacity[left] as i64, prefix[left])).or_insert(0) += 1;
            count += *seen
                .get(&(capacity[r] as i64, prefix[r - 1] - capacity[r] as i64))
                .unwrap_or(&0);
        }
        count
    }
}
