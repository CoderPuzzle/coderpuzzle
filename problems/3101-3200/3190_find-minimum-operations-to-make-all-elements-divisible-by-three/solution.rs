impl Solution {
    // Elements are independent: each operation touches exactly one
    // element, so every element needs only the distance from its nearest
    // multiple of 3 — a remainder of 1 or 2 costs exactly one +/- 1,
    // remainder 0 costs nothing.
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        nums.iter()
            .map(|&v| {
                let r = v % 3;
                r.min((3 - r) % 3)
            })
            .sum()
    }
}
