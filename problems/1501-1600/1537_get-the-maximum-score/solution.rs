impl Solution {
    pub fn max_sum(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let (n1, n2) = (nums1.len(), nums2.len());
        let (mut i, mut j) = (0usize, 0usize);
        // Running sum of each array since the last crossing point, kept in
        // i64: with n up to 1e5 and values up to 1e7, an unreduced segment
        // sum can reach roughly 1e12.
        let mut sum1: i64 = 0;
        let mut sum2: i64 = 0;
        let mut result: i64 = 0;
        while i < n1 && j < n2 {
            if nums1[i] < nums2[j] {
                sum1 += nums1[i] as i64;
                i += 1;
            } else if nums1[i] > nums2[j] {
                sum2 += nums2[j] as i64;
                j += 1;
            } else {
                // Crossing point: lock in the better of the two segments,
                // plus the shared value itself (counted once), then reset.
                result += sum1.max(sum2) + nums1[i] as i64;
                sum1 = 0;
                sum2 = 0;
                i += 1;
                j += 1;
            }
        }
        // Drain whichever array still has a tail; no more crossings are
        // possible once one array is exhausted.
        while i < n1 {
            sum1 += nums1[i] as i64;
            i += 1;
        }
        while j < n2 {
            sum2 += nums2[j] as i64;
            j += 1;
        }
        result += sum1.max(sum2);
        (result % MOD) as i32
    }
}
