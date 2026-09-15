impl Solution {
    pub fn max_operations(nums: Vec<i32>) -> i32 {
        // The first operation is forced: its score fixes the target sum
        // every later operation must repeat.
        let score = nums[0] + nums[1];
        let mut operations: i32 = 1;
        // Greedily consume consecutive pairs while each sums to that score;
        // the first mismatch (or a lone leftover element) ends the run.
        let mut i = 2;
        while i + 1 < nums.len() {
            if nums[i] + nums[i + 1] != score {
                break;
            }
            operations += 1;
            i += 2;
        }
        operations
    }
}
