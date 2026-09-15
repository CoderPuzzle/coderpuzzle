impl Solution {
    pub fn max_value(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        // suf[i]: smallest value in nums[i..n-1]; i32::MAX past the end lets
        // the last index always close its segment.
        let mut suf = vec![0i32; n + 1];
        suf[n] = i32::MAX;
        for i in (0..n).rev() {
            suf[i] = suf[i + 1].min(nums[i]);
        }
        // Grow the current segment while its prefix maximum strictly exceeds
        // the suffix minimum just past it: any such boundary is crossed by
        // an inverted pair, so the component cannot end there.
        let mut ans: Vec<i32> = Vec::with_capacity(n);
        let (mut seg_max, mut run) = (0i32, 0usize);
        for i in 0..n {
            seg_max = seg_max.max(nums[i]);
            run += 1;
            if i == n - 1 || seg_max <= suf[i + 1] {
                // The segment is closed: every index inside it reaches the
                // segment maximum and nothing beyond it.
                ans.resize(ans.len() + run, seg_max);
                seg_max = 0;
                run = 0;
            }
        }
        ans
    }
}
