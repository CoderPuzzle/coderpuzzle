impl Solution {
    pub fn max_sum_range_query(nums: Vec<i32>, requests: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        // Difference array: +1 at the start of each request's range, -1 just
        // past its end; a prefix sum then turns this into per-index request
        // coverage counts instead of re-walking every request's range.
        let mut diff = vec![0i64; n + 1];
        for request in &requests {
            let start = request[0] as usize;
            let end = request[1] as usize;
            diff[start] += 1;
            diff[end + 1] -= 1;
        }
        let mut freq = vec![0i64; n];
        let mut running = 0i64;
        for i in 0..n {
            running += diff[i];
            freq[i] = running;
        }
        let mut sorted_nums = nums.clone();
        sorted_nums.sort_unstable_by(|a, b| b.cmp(a));
        freq.sort_unstable_by(|a, b| b.cmp(a));
        // Rearrangement inequality: pairing the largest values with the
        // largest weights (both sorted descending) maximizes the sum of
        // pairwise products.
        let mut total: i64 = 0;
        for i in 0..n {
            total += sorted_nums[i] as i64 * freq[i];
        }
        (total % MOD) as i32
    }
}
