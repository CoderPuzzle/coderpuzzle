impl Solution {
    pub fn sort_colors(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        // With only three keys the multiset fixes the output, so tally each
        // color into a slot indexed by the value itself.
        let mut counts = [0i32; 3];
        for &value in &nums {
            counts[value as usize] += 1;
        }
        // Overwrite pass: emitting blocks 0,1,2 in order partitions nums;
        // safe because the tally above already captured every element.
        let mut index = 0;
        for color in 0..3 {
            for _ in 0..counts[color as usize] {
                nums[index] = color;
                index += 1;
            }
        }
        nums
    }
}
