impl Solution {
    pub fn ways_to_make_fair(nums: Vec<i32>) -> i32 {
        // Removing index i leaves every earlier element on its own index
        // and slides every later one down a slot, flipping the suffix's
        // parity: the after-removal even sum is the prefix's even sum
        // plus the suffix's odd sum, and vice versa for odd. Four running
        // totals (even/odd sums of the visited prefix and of the
        // untouched suffix) test each candidate removal in O(1).
        let (mut left_even, mut left_odd) = (0i64, 0i64);
        let (mut right_even, mut right_odd) = (0i64, 0i64);
        for (i, &value) in nums.iter().enumerate() {
            if i % 2 == 0 {
                right_even += value as i64;
            } else {
                right_odd += value as i64;
            }
        }
        let mut count = 0i32;
        for (i, &value) in nums.iter().enumerate() {
            if i % 2 == 0 {
                right_even -= value as i64;
            } else {
                right_odd -= value as i64;
            }
            if left_even + right_odd == left_odd + right_even {
                count += 1;
            }
            if i % 2 == 0 {
                left_even += value as i64;
            } else {
                left_odd += value as i64;
            }
        }
        count
    }
}
