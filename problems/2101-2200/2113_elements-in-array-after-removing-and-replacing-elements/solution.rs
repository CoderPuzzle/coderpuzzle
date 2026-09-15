impl Solution {
    pub fn element_in_nums(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let length = nums.len() as i32;
        let cycle = 2 * length;
        queries
            .into_iter()
            .map(|query| {
                let phase = query[0] % cycle;
                let index = query[1];
                if phase < length {
                    let original_index = phase + index;
                    if original_index < length {
                        nums[original_index as usize]
                    } else {
                        -1
                    }
                } else {
                    let restored = phase - length;
                    if index < restored {
                        nums[index as usize]
                    } else {
                        -1
                    }
                }
            })
            .collect()
    }
}
