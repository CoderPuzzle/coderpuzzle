impl Solution {
    pub fn sort_transformed_array(nums: Vec<i32>, a: i32, b: i32, c: i32) -> Vec<i32> {
        // f(x) = ax^2 + bx + c is a parabola, so its extreme transformed
        // values sit at the two ends of the sorted nums, not in the middle.
        // When a >= 0 the curve opens upward (a == 0 leaves a monotone line,
        // where the same discipline still holds): the largest values wait at
        // the ends, so the result fills from the back, each step consuming
        // the larger of f(nums[lo]) and f(nums[hi]). When a < 0 the parabola
        // is inverted, the smallest values sit at the ends, and the fill runs
        // from the front taking the smaller. |f(x)| <= 100*100^2 + 100*100 +
        // 100 = 1,010,100, well inside the i32 range.
        let f = |x: i32| (a * x + b) * x + c;
        let n = nums.len() as i32;
        let mut result = vec![0; nums.len()];
        let mut lo = 0;
        let mut hi = n - 1;
        let mut index = if a >= 0 { n - 1 } else { 0 };
        while lo <= hi {
            let left = f(nums[lo as usize]);
            let right = f(nums[hi as usize]);
            let take_left = if a >= 0 { left >= right } else { left <= right };
            result[index as usize] = if take_left { left } else { right };
            if take_left {
                lo += 1;
            } else {
                hi -= 1;
            }
            index += if a >= 0 { -1 } else { 1 };
        }
        result
    }
}
