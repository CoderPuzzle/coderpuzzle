use std::collections::HashMap;

impl Solution {
    pub fn find_max_length(nums: Vec<i32>) -> i32 {
        // Treat 0 as -1 and 1 as +1 and carry the running balance: equal
        // counts cancel, so a repeated balance at i < j bounds an
        // equal-count subarray of length j - i. Keep only the FIRST index
        // of each balance (0 seeded at -1) so every repeat stretches its
        // window as far as possible.
        let mut first: HashMap<i32, i32> = HashMap::new();
        first.insert(0, -1);
        let mut best = 0;
        let mut balance = 0;
        for (index, &value) in nums.iter().enumerate() {
            balance += if value == 1 { 1 } else { -1 };
            if let Some(&earlier) = first.get(&balance) {
                best = best.max(index as i32 - earlier);
            } else {
                first.insert(balance, index as i32);
            }
        }
        best
    }
}
