impl Solution {
    pub fn find_length(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let (m, n) = (nums1.len(), nums2.len());
        // dp[j] = longest common run starting exactly at nums1[i+1], nums2[j];
        // sweeping i downward keeps row i+1 available when row i is computed.
        let mut dp = vec![0i32; n + 1];
        let mut best = 0i32;
        for i in (0..m).rev() {
            let mut cur = vec![0i32; n + 1];
            for j in (0..n).rev() {
                if nums1[i] == nums2[j] {
                    // Match extends the run starting at (i+1, j+1); a mismatch
                    // leaves 0 — no shared subarray starts there.
                    cur[j] = dp[j + 1] + 1;
                    if cur[j] > best {
                        best = cur[j];
                    }
                }
            }
            // Roll: only the previous row is ever read.
            dp = cur;
        }
        best
    }
}
