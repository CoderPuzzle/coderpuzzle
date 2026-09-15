impl Solution {
    pub fn largest_sum_after_k_negations(nums: Vec<i32>, mut k: i32) -> i32 {
        // Sort so the most negative values lead, then spend operations on
        // them first — flipping the most negative value always raises the
        // sum by the most. Stop as soon as either k runs out or the walk
        // reaches a nonnegative value.
        let mut nums = nums;
        nums.sort();
        let n = nums.len();
        let mut i = 0;
        while i < n && nums[i] < 0 && k > 0 {
            nums[i] = -nums[i];
            k -= 1;
            i += 1;
        }
        let total: i32 = nums.iter().sum();
        // Any leftover operations only matter by parity: flipping the same
        // value twice restores it. An odd leftover must land somewhere, and
        // the cheapest place is the smallest absolute value in the array —
        // scanning the whole array (not just the untouched suffix) also
        // covers a zero sitting among the values, which absorbs the flip
        // for free no matter how many operations remain.
        if k % 2 == 1 {
            let min_abs = nums.iter().map(|x| x.abs()).min().unwrap();
            total - 2 * min_abs
        } else {
            total
        }
    }
}
