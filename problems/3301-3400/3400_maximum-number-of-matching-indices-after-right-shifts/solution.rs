impl Solution {
    // After k right shifts of nums1, index j matches iff
    // nums1[(j - k) % n] == nums2[j], so comparing nums1[i] against
    // nums2[(i + k) % n] counts shift k's matches without materializing the
    // shifted array; n <= 3000 keeps the full O(n^2) sweep at ~9M
    // comparisons.
    pub fn maximum_matching_indices(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let n = nums1.len();
        let mut best = 0;
        let mut k = 0;
        while k < n && best < n as i32 {
            let mut count = 0;
            for i in 0..n {
                if nums1[i] == nums2[(i + k) % n] {
                    count += 1;
                }
            }
            best = best.max(count);
            k += 1;
        }
        best
    }
}
