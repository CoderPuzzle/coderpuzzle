impl Solution {
    pub fn longest_nice_subarray(nums: Vec<i32>) -> i32 {
        // a lone element is always nice: best starts at 1, mask starts empty
        let mut best = 1;
        let mut left = 0;
        let mut window_or: i32 = 0;
        // nice <=> no two members share a bit <=> the window's OR mask is
        // disjoint from the incoming value: one AND test per step
        for right in 0..nums.len() {
            let value = nums[right];
            // conflict: drop from the left; XOR undoes the earlier | because
            // disjointness guarantees the element's bits are private to it
            while window_or & value != 0 {
                window_or ^= nums[left];
                left += 1;
            }
            window_or |= value;
            if right - left + 1 > best {
                best = right - left + 1;
            }
        }
        best as i32
    }
}
