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
        // Both cut bounds move monotonically with the first cut, so two
        // pointers that only ever advance replace the repeated searches.
        let mut lo = 2;
        let mut hi = 2;
        for i in 1..n - 1 {
            let left = prefix[i];
            if lo < i + 1 {
                lo = i + 1;
            }
            // left <= mid becomes prefix[j] >= 2 * left: skip the entries
            // that leave the middle block too small.
            while lo < n && prefix[lo] < 2 * left {
                lo += 1;
            }
            if lo >= n {
                continue;
            }
            // mid <= right becomes prefix[j] <= (total + left) / 2 — the
            // floor is exact because the bound is an integer inequality.
            if hi < lo {
                hi = lo;
            }
            while hi < n && prefix[hi] <= (total + left) / 2 {
                hi += 1;
            }
            if hi > lo {
                answer = (answer + (hi - lo) as i64) % MOD;
            }
        }
        answer as i32
    }
}
