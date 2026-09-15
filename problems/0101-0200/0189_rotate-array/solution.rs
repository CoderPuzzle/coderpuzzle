impl Solution {
    pub fn rotate(mut nums: Vec<i32>, k: i32) -> Vec<i32> {
        // Ownership hands over the whole allocation, so the reversal passes
        // rewrite it in place — no second array is ever built.
        let n = nums.len();
        // A rotation by n steps is the identity, so any larger k wraps
        // around to k % n — normalize before splitting into blocks.
        let k = (k as usize) % n;
        // Three reversals compose into a right rotation: reversing the
        // whole array trades the two blocks, and reversing each block
        // afterwards restores its internal order.
        nums.reverse();
        nums[..k].reverse();
        nums[k..].reverse();
        nums
    }
}
