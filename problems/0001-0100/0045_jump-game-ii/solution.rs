impl Solution {
    pub fn jump(nums: Vec<i32>) -> i32 {
        // Implicit BFS over jump levels: the indices reachable in `jumps`
        // steps form the window (current_end, next_end], so one left-to-right
        // walk with two window edges replaces an explicit queue.
        let mut jumps = 0;
        let mut current_end = 0;
        let mut next_end = 0;
        let last = nums.len() as i32 - 1;
        for index in 0..last {
            next_end = next_end.max(index + nums[index as usize]);
            if index == current_end {
                // The level is exhausted; the next jump starts the level
                // that reaches as far as anything scanned so far.
                jumps += 1;
                current_end = next_end;
            }
        }
        // A single-element array never enters the loop: 0 jumps.
        jumps
    }
}
