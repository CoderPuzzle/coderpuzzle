impl Solution {
    pub fn min_moves(nums: Vec<i32>, limit: i32) -> i32 {
        let n = nums.len();
        let limit = limit as usize;
        // Difference array over candidate target sums t in [2, 2*limit]:
        // each mirror pair's cost curve becomes range updates.
        let mut diff = vec![0i64; 2 * limit + 2];
        for i in 0..n / 2 {
            let a = nums[i] as usize;
            let b = nums[n - 1 - i] as usize;
            let (lo, hi) = if a < b { (a, b) } else { (b, a) };
            // Base cost 2 everywhere; −1 across [lo+1, hi+limit], the sums
            // one changed element can reach; a further −1 exactly at
            // t = a + b, where no change is needed.
            diff[2] += 2;
            diff[lo + 1] -= 1;
            diff[a + b] -= 1;
            diff[a + b + 1] += 1;
            diff[hi + limit + 1] += 1;
        }
        // Prefix sums give the total cost per target; keep the minimum.
        let mut best = i64::MAX;
        let mut cur = 0i64;
        for target in 2..=2 * limit {
            cur += diff[target];
            if cur < best {
                best = cur;
            }
        }
        best as i32
    }
}
