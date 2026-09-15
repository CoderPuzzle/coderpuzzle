impl Solution {
    pub fn sample_stats(count: Vec<i32>) -> Vec<f64> {
        // One pass over the 256 buckets finds every statistic except the
        // median: min/max are the first/last nonzero buckets, the mode is
        // the largest count, and the mean needs the total count and the
        // weighted value sum (kept in 64-bit integers — counts reach 1e9).
        let mut total: i64 = 0;
        let mut total_sum: i64 = 0;
        let mut first: i32 = -1;
        let mut last: i32 = -1;
        let mut mode: usize = 0;
        for (i, &c) in count.iter().enumerate() {
            if c > 0 {
                if first == -1 {
                    first = i as i32;
                }
                last = i as i32;
                if c > count[mode] {
                    mode = i;
                }
                total += c as i64;
                total_sum += (i as i64) * (c as i64);
            }
        }
        let mean = total_sum as f64 / total as f64;
        // k-th smallest element (1-indexed), found by walking the buckets.
        let kth = |k: i64| -> i32 {
            let mut acc: i64 = 0;
            for (i, &c) in count.iter().enumerate() {
                acc += c as i64;
                if acc >= k {
                    return i as i32;
                }
            }
            0
        };
        let median: f64 = if total % 2 == 1 {
            kth(total / 2 + 1) as f64
        } else {
            (kth(total / 2) + kth(total / 2 + 1)) as f64 / 2.0
        };
        vec![first as f64, last as f64, mean, median, mode as f64]
    }
}
