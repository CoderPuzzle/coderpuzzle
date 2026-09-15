impl Solution {
    pub fn count_elements(nums: Vec<i32>) -> i32 {
        // An element qualifies exactly when it sits strictly between the
        // array's minimum and maximum: a strictly smaller witness exists
        // iff x > min, a strictly larger one iff x < max.
        let lo = *nums.iter().min().unwrap();
        let hi = *nums.iter().max().unwrap();
        nums.iter().filter(|&&x| lo < x && x < hi).count() as i32
    }
}
