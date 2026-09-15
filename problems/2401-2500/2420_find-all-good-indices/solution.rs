impl Solution {
    pub fn good_indices(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // Run-length DP: noninc[i] is the longest non-increasing run ending
        // at i; nondec[i] the longest non-decreasing run starting at i.
        // Index i is good exactly when both runs flanking it reach length
        // k: noninc[i-1] >= k covers nums[i-k..i-1], nondec[i+1] >= k
        // covers nums[i+1..i+k]. Two linear sweeps plus one pass over the
        // candidate range replace an O(n*k) window scan.
        let n = nums.len();
        let k = k as usize;
        let mut noninc = vec![1usize; n];
        let mut nondec = vec![1usize; n];
        for i in 1..n {
            if nums[i] <= nums[i - 1] {
                noninc[i] = noninc[i - 1] + 1;
            }
        }
        for i in (0..n.saturating_sub(1)).rev() {
            if nums[i] <= nums[i + 1] {
                nondec[i] = nondec[i + 1] + 1;
            }
        }
        let mut good = Vec::with_capacity(n.saturating_sub(2 * k));
        for i in k..n - k {
            if noninc[i - 1] >= k && nondec[i + 1] >= k {
                good.push(i as i32);
            }
        }
        good
    }
}
