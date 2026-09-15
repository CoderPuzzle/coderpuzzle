impl Solution {
    pub fn count_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        // Suffix ANDs ending at one index take at most ~30 distinct values:
        // walking the left end rightward can only clear bits, so every value
        // change drops at least one bit. (value, count) buckets make the
        // scan O(n * 30) instead of enumerating all subarrays. The answer
        // reaches n * (n + 1) / 2 = 5,000,050,000, past i32 range, so it
        // accumulates in i64.
        let mut total: i64 = 0;
        let mut values: Vec<i32> = Vec::new();
        let mut counts: Vec<i64> = Vec::new();
        for &value in nums.iter() {
            let mut next_values: Vec<i32> = vec![value];
            let mut next_counts: Vec<i64> = vec![1];
            for i in 0..values.len() {
                let merged = values[i] & value;
                if *next_values.last().unwrap() == merged {
                    *next_counts.last_mut().unwrap() += counts[i];
                } else {
                    next_values.push(merged);
                    next_counts.push(counts[i]);
                }
            }
            values = next_values;
            counts = next_counts;
            for i in 0..values.len() {
                if values[i] == k {
                    total += counts[i];
                }
            }
        }
        total
    }
}
