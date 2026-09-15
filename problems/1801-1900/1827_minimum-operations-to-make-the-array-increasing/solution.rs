impl Solution {
    // Strict increase forces each element to at least prev + 1, and
    // lifting an element any higher only raises the floor of the next
    // one, so the cheapest reachable target is exactly that floor.
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let mut ops = 0;
        let mut prev = nums[0];
        for i in 1..nums.len() {
            let target = std::cmp::max(prev + 1, nums[i]);
            ops += target - nums[i];
            prev = target;
        }
        ops
    }
}
