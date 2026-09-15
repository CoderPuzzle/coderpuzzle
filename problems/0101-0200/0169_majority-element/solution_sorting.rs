impl Solution {
    pub fn majority_element(mut nums: Vec<i32>) -> i32 {
        // Sort in place (we own the vec): the majority's occurrences stand
        // together as one run longer than half the array, and a run that
        // long must cover the middle -- so the value at the halfway index
        // is the majority, whatever the input order was.
        nums.sort_unstable();
        nums[nums.len() / 2]
    }
}
