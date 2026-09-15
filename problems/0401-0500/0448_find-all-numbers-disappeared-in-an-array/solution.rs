impl Solution {
    pub fn find_disappeared_numbers(mut nums: Vec<i32>) -> Vec<i32> {
        // Values in [1, n] let the array index itself be the hash: value v
        // maps to slot v-1, and flipping that slot's sign records "v seen".
        // A value that never appears leaves its slot positive.
        for i in 0..nums.len() {
            let value = nums[i].abs();
            let index = (value - 1) as usize;
            if nums[index] > 0 {
                nums[index] = -nums[index];
            }
        }
        // A second sweep reads the marks: slot i positive means i+1 never
        // appeared, so it is collected; negative marks are restored on the
        // way out, leaving the array exactly as it arrived. Index order is
        // value order, so the pinned ascending output is free.
        let mut disappeared = Vec::new();
        for i in 0..nums.len() {
            if nums[i] > 0 {
                disappeared.push(i as i32 + 1);
            } else {
                nums[i] = -nums[i];
            }
        }
        disappeared
    }
}
