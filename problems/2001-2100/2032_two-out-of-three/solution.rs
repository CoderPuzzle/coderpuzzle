impl Solution {
    pub fn two_out_of_three(nums1: Vec<i32>, nums2: Vec<i32>, nums3: Vec<i32>) -> Vec<i32> {
        let mut masks = [0_u8; 101];
        for (bit, nums) in [nums1, nums2, nums3].iter().enumerate() {
            for &value in nums {
                masks[value as usize] |= 1 << bit;
            }
        }

        (1..=100)
            .filter(|&value| {
                let mask = masks[value];
                mask.count_ones() >= 2
            })
            .map(|value| value as i32)
            .collect()
    }
}
