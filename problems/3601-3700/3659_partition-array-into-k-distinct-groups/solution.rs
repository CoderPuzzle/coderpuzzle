use std::collections::HashMap;

impl Solution {
    pub fn partition_array(nums: Vec<i32>, k: i32) -> bool {
        // Whole groups of exactly k require n to divide evenly, and each
        // occurrence of a value consumes a group of its own, so no value may
        // occur more often than the number of groups.
        let n = nums.len() as i32;
        if n % k != 0 {
            return false;
        }
        let mut count: HashMap<i32, i32> = HashMap::new();
        let mut most_frequent = 0;
        for value in nums {
            let seen = count.entry(value).or_insert(0);
            *seen += 1;
            most_frequent = most_frequent.max(*seen);
        }
        most_frequent <= n / k
    }
}
