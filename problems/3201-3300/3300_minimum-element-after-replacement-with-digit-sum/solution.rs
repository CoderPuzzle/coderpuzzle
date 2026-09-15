impl Solution {
    pub fn min_element(nums: Vec<i32>) -> i32 {
        // Replacement acts per element, and a number's digit sum is never
        // larger than the number itself, so the answer is the smallest
        // per-element digit sum.
        let mut best = -1i32;
        for &value in nums.iter() {
            let mut rest = value;
            let mut digit_sum = 0i32;
            while rest > 0 {
                digit_sum += rest % 10;
                rest /= 10;
            }
            // The running minimum can only decrease: every replacement
            // shrinks (or keeps) its element.
            if best < 0 || digit_sum < best {
                best = digit_sum;
            }
        }
        best
    }
}
