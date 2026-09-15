impl Solution {
    pub fn find132pattern(nums: Vec<i32>) -> bool {
        if nums.len() < 3 {
            return false;
        }
        let mut stack: Vec<i32> = Vec::new();
        // Scan right-to-left; `third` is the largest value known to sit
        // after something bigger — the best nums[k] candidate (MIN = none
        // yet).
        let mut third: i64 = i64::MIN;
        for &value in nums.iter().rev() {
            // Current value below third makes it a valid nums[i]; the pair
            // that produced third lies entirely to its right.
            if (value as i64) < third {
                return true;
            }
            // Popped values are smaller than `value` and lie to its right,
            // so each has a larger number before it; the last (largest)
            // popped becomes third. The stack stays decreasing.
            while let Some(&top) = stack.last() {
                if top < value {
                    third = top as i64;
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(value);
        }
        false
    }
}
