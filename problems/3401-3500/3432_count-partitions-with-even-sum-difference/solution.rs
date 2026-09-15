impl Solution {
    pub fn count_partitions(nums: Vec<i32>) -> i32 {
        // left - right = total - 2 * right, and twice any integer is even,
        // so every partition's difference carries the total's parity: either
        // all n - 1 splits are even (total even) or none is (total odd).
        let total: i32 = nums.iter().sum();
        if total % 2 == 0 {
            nums.len() as i32 - 1
        } else {
            0
        }
    }
}
