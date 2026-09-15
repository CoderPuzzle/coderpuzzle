impl Solution {
    pub fn k_length_apart(nums: Vec<i32>, k: i32) -> bool {
        let mut previous: i32 = -1;
        for (index, &value) in nums.iter().enumerate() {
            if value == 1 {
                let index = index as i32;
                if previous >= 0 && index - previous <= k {
                    return false;
                }
                previous = index;
            }
        }
        true
    }
}
