impl Solution {
    pub fn dominant_index(nums: Vec<i32>) -> i32 {
        // One pass for the top two values: the largest dominates exactly when
        // it is at least twice the runner-up, since every other element is at
        // most that runner-up.
        let mut best = 0;
        let mut second = -1;
        for i in 1..nums.len() {
            if nums[i] > nums[best] {
                second = nums[best];
                best = i;
            } else if nums[i] > second {
                second = nums[i];
            }
        }
        // The boundary is inclusive: "at least twice" keeps max == 2 * second.
        if nums[best] >= 2 * second {
            best as i32
        } else {
            -1
        }
    }
}
