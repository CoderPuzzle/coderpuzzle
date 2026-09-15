impl Solution {
    pub fn longest_ones(nums: Vec<i32>, k: i32) -> i32 {
        // flipping <= k zeros == longest window holding <= k zeros
        // (nothing is actually flipped)
        let mut left = 0usize;
        let mut zeros = 0i32;
        let mut best = 0usize;
        for (right, &value) in nums.iter().enumerate() {
            if value == 0 {
                zeros += 1;
            }
            // shrink from the left only as far as necessary — never reset —
            // so the window keeps growing across long stretches
            while zeros > k {
                if nums[left] == 0 {
                    zeros -= 1;
                }
                left += 1;
            }
            // after the shrink this is the longest valid window ending at
            // right; each index enters and leaves the window at most once
            if right - left + 1 > best {
                best = right - left + 1;
            }
        }
        best as i32
    }
}
