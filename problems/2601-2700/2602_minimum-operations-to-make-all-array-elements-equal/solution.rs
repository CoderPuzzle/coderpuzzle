impl Solution {
    pub fn min_operations(nums: Vec<i32>, queries: Vec<i32>) -> Vec<i64> {
        let mut sorted = nums.clone();
        sorted.sort();
        let n = sorted.len();
        let mut prefix: Vec<i64> = vec![0; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + sorted[i] as i64;
        }
        let mut out = Vec::with_capacity(queries.len());
        for &q in &queries {
            // Each query is the sum of |nums[i] - q|; sorted prefix sums make
            // it one binary search plus O(1) arithmetic. j counts elements
            // strictly below q (ties land right but contribute zero either
            // way): smaller ones are raised to q, the rest are lowered.
            let j = sorted.partition_point(|&x| x < q);
            let left = q as i64 * j as i64 - prefix[j];
            let right = (prefix[n] - prefix[j]) - q as i64 * (n - j) as i64;
            out.push(left + right);
        }
        out
    }
}
