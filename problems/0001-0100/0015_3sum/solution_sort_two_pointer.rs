impl Solution {
    pub fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        // Sort in place (we own the vec): every emitted triplet is
        // ascending, and the i-scan emits triplets in lexicographic order.
        nums.sort_unstable();
        let n = nums.len();
        let mut result: Vec<Vec<i32>> = Vec::new();
        for i in 0..n {
            if i + 2 >= n {
                break;
            }
            // Reusing the same value for the fixed element would re-find
            // the same pairs, so skip runs of equal values.
            if i > 0 && nums[i] == nums[i - 1] {
                continue;
            }
            // Early exit: the smallest remaining value is already positive,
            // so no triplet from here on can sum to zero.
            if nums[i] > 0 {
                break;
            }
            let (mut left, mut right) = (i + 1, n - 1);
            while left < right {
                let total = nums[i] + nums[left] + nums[right];
                // Below zero the sum must grow, so left moves right; above
                // zero, right retreats.
                if total < 0 {
                    left += 1;
                } else if total > 0 {
                    right -= 1;
                } else {
                    result.push(vec![nums[i], nums[left], nums[right]]);
                    // Both advance, then run past any runs of equal values,
                    // so the same pair is never emitted twice for one i.
                    left += 1;
                    right -= 1;
                    while left < right && nums[left] == nums[left - 1] {
                        left += 1;
                    }
                    while left < right && nums[right] == nums[right + 1] {
                        right -= 1;
                    }
                }
            }
        }
        result
    }
}
