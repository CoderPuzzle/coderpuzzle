impl Solution {
    pub fn sort_colors(mut nums: Vec<i32>) -> Vec<i32> {
        // Three growing regions and an unexplored tail:
        //   [0, low)    settled 0s
        //   [low, mid)  settled 1s
        //   [mid, high] unexamined
        //   (high, end) settled 2s
        // Each step examines nums[mid] and shrinks the unexamined band.
        // `high` walks down past the front when the array is all 2s, so it
        // lives as a signed index (usize would underflow at the last step).
        let mut low = 0usize;
        let mut mid = 0usize;
        let mut high = nums.len() as isize - 1;
        while (mid as isize) <= high {
            let value = nums[mid];
            if value == 0 {
                // The element swapped in from `low` is a settled 1 (or mid
                // == low, swapping with itself), so mid may advance too.
                nums.swap(low, mid);
                low += 1;
                mid += 1;
            } else if value == 1 {
                // Already in its home region: the unexamined band alone
                // shrinks.
                mid += 1;
            } else {
                // The element swapped in from `high` is unexamined, so mid
                // stays put and re-reads it on the next pass.
                nums.swap(mid, high as usize);
                high -= 1;
            }
        }
        nums
    }
}
