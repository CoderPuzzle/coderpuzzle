impl Solution {
    pub fn count_stable_subarrays(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = nums.len();
        // left[i] is the smallest start s such that nums[s..i] reads
        // non-decreasing; it only ever moves right, which the per-query
        // binary search below relies on.
        let mut left: Vec<usize> = vec![0; n];
        let mut pref_left: Vec<i64> = vec![0; n + 1];
        let mut pref_base: Vec<i64> = vec![0; n + 1];
        for i in 0..n {
            left[i] = if i > 0 && nums[i] >= nums[i - 1] {
                left[i - 1]
            } else {
                i
            };
            // Stable subarrays ending at i inside their own run.
            pref_left[i + 1] = pref_left[i] + left[i] as i64;
            pref_base[i + 1] = pref_base[i] + (i - left[i] + 1) as i64;
        }
        let mut result = Vec::with_capacity(queries.len());
        for query in &queries {
            let (l, r) = (query[0] as usize, query[1] as usize);
            // First end whose run reaches back to l or earlier. Ends before
            // it sit past a drop at or after l and count their bare window
            // length; ends from there on count down to left[e].
            let p = left[l..r + 1].partition_point(|&start| start < l) + l;
            result.push(pref_base[r + 1] - pref_base[l] + pref_left[p] - pref_left[l] - (l * (p - l)) as i64);
        }
        result
    }
}
