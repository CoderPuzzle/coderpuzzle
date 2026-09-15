impl Solution {
    pub fn max_subarray_sum(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        // min_pref[r]: smallest prefix sum seen at an index congruent to r
        // mod k. Length divisible by k means both endpoints share a residue,
        // so within each class maximize prefix[i] minus the earlier minimum.
        let mut min_pref = vec![i64::MAX; k];
        // MIN start, not 0: an all-negative array still has a best answer.
        let mut best = i64::MIN;
        for i in 0..=n {
            let r = i % k;
            // Compare before updating the bucket, so the paired prefix is
            // strictly earlier and the subarray stays non-empty.
            if min_pref[r] != i64::MAX {
                let cand = prefix[i] - min_pref[r];
                if cand > best {
                    best = cand;
                }
            }
            if prefix[i] < min_pref[r] {
                min_pref[r] = prefix[i];
            }
        }
        best
    }
}
