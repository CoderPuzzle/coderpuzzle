impl Solution {
    // Sorting turns the count into a position: equal values form one run,
    // the majority's run is longer than half the array, and a run that long
    // always covers the middle index n / 2.
    pub fn majority_element(mut nums: Vec<i32>) -> i32 {
        nums.sort_unstable();
        // Whatever order the input arrived in, the middle of the sorted order
        // is the majority.
        nums[nums.len() / 2]
    }
}
