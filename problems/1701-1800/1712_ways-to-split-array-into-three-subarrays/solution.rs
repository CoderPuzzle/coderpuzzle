impl Solution {
    pub fn ways_to_split(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        let total = prefix[n];
        let mut answer: i64 = 0;
        // prefix is non-decreasing, so for a fixed left cut the legal
        // second cuts form one contiguous range — delimit it with two
        // partition-point searches.
        for i in 1..n - 1 {
            let left = prefix[i];
            // left <= mid becomes prefix[j] >= 2 * left: first legal j.
            let lo = i + 1 + prefix[i + 1..n].partition_point(|&v| v < 2 * left);
            if lo >= n {
                continue;
            }
            // mid <= right becomes prefix[j] <= (total + left) / 2 — the
            // floor is exact because the bound is an integer inequality.
            let hi = lo + prefix[lo..n].partition_point(|&v| v <= (total + left) / 2);
            if hi > lo {
                answer = (answer + (hi - lo) as i64) % MOD;
            }
        }
        answer as i32
    }
}
