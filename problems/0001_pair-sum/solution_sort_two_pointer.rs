impl Solution {
    pub fn pair_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Order the positions by their values: the pair hunt can then run as
        // a converging scan, while each position rides along with its value.
        let mut order: Vec<usize> = (0..nums.len()).collect();
        order.sort_by_key(|&position| nums[position]);
        // Converging pointers over that order. A too-small total can only be
        // raised by advancing low; a too-large one only lowered by retreating
        // high -- each step retires one position as a possible member.
        let mut low = 0usize;
        let mut high = order.len() - 1;
        while low < high {
            let total = nums[order[low]] + nums[order[high]];
            if total == target {
                // The positions come out in value order; either ordering of
                // the two is accepted.
                return vec![order[low] as i32, order[high] as i32];
            }
            if total < target {
                low += 1;
            } else {
                high -= 1;
            }
        }
        // Statement promises a solution exists; empty is just the fallback.
        Vec::new()
    }
}
