impl Solution {
    pub fn min_max_game(nums: Vec<i32>) -> i32 {
        let mut current = nums;
        while current.len() > 1 {
            let mut next_values = Vec::with_capacity(current.len() / 2);
            for i in 0..current.len() / 2 {
                if i % 2 == 0 {
                    next_values.push(current[2 * i].min(current[2 * i + 1]));
                } else {
                    next_values.push(current[2 * i].max(current[2 * i + 1]));
                }
            }
            current = next_values;
        }
        current[0]
    }
}
