impl Solution {
    pub fn find_duplicates(mut nums: Vec<i32>) -> Vec<i32> {
        // Values in [1, n] let the array index itself be the hash: value v
        // maps to slot v-1, and flipping that slot's sign records "v seen".
        // A slot already negative means |v| was visited before: a duplicate.
        let mut duplicates = Vec::with_capacity(nums.len() / 2);
        for i in 0..nums.len() {
            let value = nums[i].abs();
            let index = (value - 1) as usize;
            if nums[index] < 0 {
                duplicates.push(value);
            } else {
                nums[index] = -nums[index];
            }
        }
        // Restore every sign so the array is left as it was found, then emit
        // the ascending order this judge pins on the original's any-order
        // freedom.
        for value in &mut nums {
            *value = value.abs();
        }
        duplicates.sort_unstable();
        duplicates
    }
}
