impl Solution {
    pub fn can_sort_array(nums: Vec<i32>) -> bool {
        let mut previous_max: i32 = 0;
        let mut current_max: i32 = 0;
        let mut current_bits: i32 = 0;
        for value in nums {
            let bits = value.count_ones() as i32;
            if bits != current_bits {
                previous_max = current_max;
                current_bits = bits;
                current_max = 0;
            }
            if value < previous_max {
                return false;
            }
            if value > current_max {
                current_max = value;
            }
        }
        true
    }
}
