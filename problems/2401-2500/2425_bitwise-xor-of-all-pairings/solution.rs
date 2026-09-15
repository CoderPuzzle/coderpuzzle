impl Solution {
    pub fn xor_all_nums(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Each a_i appears m times and each b_j n times in the n*m pair
        // XORs; even counts self-cancel, so only parity survives.
        let mut answer = 0;
        if nums2.len() % 2 == 1 {
            // m odd: nums1's overall XOR does not cancel.
            for &value in &nums1 {
                answer ^= value;
            }
        }
        if nums1.len() % 2 == 1 {
            // n odd: nums2's overall XOR does not cancel.
            for &value in &nums2 {
                answer ^= value;
            }
        }
        answer
    }
}
