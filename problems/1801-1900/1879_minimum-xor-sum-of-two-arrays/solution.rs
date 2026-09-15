impl Solution {
    pub fn minimum_xor_sum(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let n = nums1.len();
        let size = 1usize << n;
        let inf = i64::MAX / 4;
        let mut dp = vec![inf; size];
        dp[0] = 0;
        for mask in 1..size {
            let i = mask.count_ones() as usize - 1; // index into nums1 for this subset
            let x = nums1[i] as i64;
            let mut best = inf;
            let mut m = mask;
            while m != 0 {
                let lowbit = m & m.wrapping_neg();
                let j = lowbit.trailing_zeros() as usize;
                let cand = dp[mask ^ lowbit] + (x ^ nums2[j] as i64);
                if cand < best {
                    best = cand;
                }
                m -= lowbit;
            }
            dp[mask] = best;
        }
        dp[size - 1] as i32
    }
}
