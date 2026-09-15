use std::cmp::Ordering;

impl Solution {
    pub fn gcd_values(nums: Vec<i32>, queries: Vec<i64>) -> Vec<i32> {
        let max_value = *nums.iter().max().unwrap() as usize;
        let mut freq = vec![0i64; max_value + 1];
        for &value in nums.iter() {
            freq[value as usize] += 1;
        }
        // pairs_with_gcd[d]: pairs whose gcd is exactly d. Processing d from
        // max_value down, pairs sharing divisor d minus the already-fixed
        // exact counts of every proper multiple of d (inclusion-exclusion).
        // Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past i32 range.
        let mut exact = vec![0i64; max_value + 1];
        for d in (1..=max_value).rev() {
            let mut count: i64 = 0;
            let mut multiple = d;
            while multiple <= max_value {
                count += freq[multiple];
                multiple += d;
            }
            let mut pairs = count * (count - 1) / 2;
            let mut multiple = 2 * d;
            while multiple <= max_value {
                pairs -= exact[multiple];
                multiple += d;
            }
            exact[d] = pairs;
        }
        let mut prefix = vec![0i64; max_value + 1];
        let mut running: i64 = 0;
        for d in 1..=max_value {
            running += exact[d];
            prefix[d] = running;
        }
        // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
        // i64s; each answer is a gcd, at most 5 * 10^4.
        let mut answer = Vec::with_capacity(queries.len());
        for query in queries.iter() {
            let mut lo = 1usize;
            let mut hi = max_value;
            let target = query + 1;
            while lo < hi {
                let mid = (lo + hi) / 2;
                match prefix[mid].cmp(&target) {
                    Ordering::Less => lo = mid + 1,
                    _ => hi = mid,
                }
            }
            answer.push(lo as i32);
        }
        answer
    }
}
