impl Solution {
    // Boyer-Moore voting: one candidate, one counter. A match raises the
    // counter, a mismatch spends it; at zero the candidate is swapped for the
    // current element.
    pub fn majority_element(nums: Vec<i32>) -> i32 {
        let mut candidate = nums[0];
        let mut count = 0;
        for &value in &nums {
            if count == 0 {
                candidate = value;
            }
            count += if value == candidate { 1 } else { -1 };
        }
        // Every cancellation removes one majority and one minority element, and
        // the majority holds more than half the array, so it always survives.
        candidate
    }
}
