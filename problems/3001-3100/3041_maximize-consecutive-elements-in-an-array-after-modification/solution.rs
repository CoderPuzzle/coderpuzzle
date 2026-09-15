use std::collections::HashMap;

impl Solution {
    pub fn max_selected_elements(nums: Vec<i32>) -> i32 {
        let mut nums = nums;
        nums.sort_unstable();
        let mut dp: HashMap<i32, i32> = HashMap::new();
        let mut best = 0;
        for a in nums {
            let here = |key: i32| *dp.get(&key).unwrap_or(&0);
            let up = here(a + 1).max(here(a) + 1);
            let stay = here(a).max(here(a - 1) + 1);
            dp.insert(a + 1, up);
            dp.insert(a, stay);
            best = best.max(up).max(stay);
        }
        best
    }
}
