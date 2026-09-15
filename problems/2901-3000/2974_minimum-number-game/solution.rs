impl Solution {
    pub fn number_game(nums: Vec<i32>) -> Vec<i32> {
        // Each round hands Alice the round's smallest value and Bob the next
        // smallest, but Bob appends first — so the sorted array with every
        // adjacent pair swapped is exactly arr.
        let mut arr = nums;
        arr.sort_unstable();
        for i in (0..arr.len()).step_by(2) {
            arr.swap(i, i + 1);
        }
        arr
    }
}
