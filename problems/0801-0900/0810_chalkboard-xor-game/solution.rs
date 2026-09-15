impl Solution {
    // Alice wins exactly when the board already folds to 0 (she wins
    // on the spot) or the count is even, letting her always hand Bob
    // a nonzero odd board he cannot escape.
    pub fn xor_game(nums: Vec<i32>) -> bool {
        let mut total = 0;
        for &value in &nums {
            total ^= value;
        }
        total == 0 || nums.len() % 2 == 0
    }
}
