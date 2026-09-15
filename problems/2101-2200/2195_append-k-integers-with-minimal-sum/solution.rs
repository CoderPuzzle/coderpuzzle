impl Solution {
    pub fn minimal_k_sum(nums: Vec<i32>, k: i32) -> i64 {
        // Take the k smallest missing positives: sort distinct values,
        // consume each gap with an arithmetic-series sum, then spill into
        // the tail. Sums reach ~k^2/2 with k up to 10^8, which needs i64.
        let mut ordered = nums;
        ordered.sort_unstable();
        ordered.dedup();
        let mut total = 0i64;
        let mut taken = 0i64;
        let mut previous = 0i64;
        let k = k as i64;
        for value in ordered {
            if taken >= k {
                break;
            }
            let gap = value as i64 - previous - 1;
            if gap > 0 {
                let take = gap.min(k - taken);
                total += take * (previous + 1) + take * (take - 1) / 2;
                taken += take;
            }
            previous = value as i64;
        }
        if taken < k {
            let take = k - taken;
            total += take * (previous + 1) + take * (take - 1) / 2;
        }
        total
    }
}
