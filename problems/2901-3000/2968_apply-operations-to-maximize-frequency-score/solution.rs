impl Solution {
    pub fn max_frequency_score(mut nums: Vec<i32>, k: i64) -> i32 {
        // After sorting, the elements worth converting to one value form a
        // contiguous window: the move cost of a set is minimized at its
        // median, and swapping any non-window member for a skipped
        // in-between element never costs more. Sliding a window [l, r]
        // rightward, the cheapest way to flatten it is to raise everything
        // to the median nums[(l + r) / 2], costing (median * left_count -
        // left_sum) + (right_sum - median * right_count) via prefix sums.
        // The cost only shrinks when the window shrinks, so l never moves
        // backwards. Costs reach n * span / 2 ~ 5 * 10^13 and k reaches
        // 10^14, so every product here is computed in 64-bit.
        nums.sort_unstable();
        let n = nums.len();
        let mut pre = vec![0i64; n + 1];
        for (i, v) in nums.iter().enumerate() {
            pre[i + 1] = pre[i] + i64::from(*v);
        }
        let mut best = 0i32;
        let mut l = 0usize;
        for r in 0..n {
            loop {
                let mid = (l + r) / 2;
                let median = i64::from(nums[mid]);
                let cost = median * (mid - l) as i64 - (pre[mid] - pre[l]) + (pre[r + 1] - pre[mid])
                    - median * (r + 1 - mid) as i64;
                if cost <= k {
                    break;
                }
                l += 1;
            }
            best = best.max((r - l + 1) as i32);
        }
        best
    }
}
