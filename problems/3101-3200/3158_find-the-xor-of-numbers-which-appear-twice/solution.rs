use std::collections::HashMap;

impl Solution {
    // One pass with a value -> count tally; values seen exactly twice
    // contribute to the XOR. XOR is its own inverse and self-canceling,
    // so values occurring once must be excluded by the count, not
    // folded in blindly. Values are bounded by 50 here; an i32 suffices.
    pub fn duplicate_numbers_xor(nums: Vec<i32>) -> i32 {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for value in nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        let mut answer = 0;
        for (value, count) in counts {
            if count == 2 {
                answer ^= value;
            }
        }
        answer
    }
}
