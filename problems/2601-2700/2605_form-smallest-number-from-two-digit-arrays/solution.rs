impl Solution {
    pub fn min_number(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // A shared digit admits a one-digit number; the smallest shared digit
        // then beats anything with more digits.
        let mut present = [false; 10];
        for &d in &nums2 {
            present[d as usize] = true;
        }
        let mut common = 10;
        for &d in &nums1 {
            if present[d as usize] && d < common {
                common = d;
            }
        }
        if common < 10 {
            return common;
        }
        // No overlap: the answer has two digits, and the tens digit is just
        // whichever array holds the globally smaller minimum.
        let a = *nums1.iter().min().unwrap();
        let b = *nums2.iter().min().unwrap();
        (10 * a + b).min(10 * b + a)
    }
}
