use std::collections::HashMap;

impl Solution {
    pub fn contains_nearby_duplicate(nums: Vec<i32>, k: i32) -> bool {
        // Hash map from value -> last index seen: of all earlier copies of a
        // value, the most recent one is the nearest, so one lookup answers
        // "was this value within k positions?" in O(1).
        let mut last_index = HashMap::new();
        for (index, value) in nums.iter().enumerate() {
            // Look up before inserting, and compare against the LAST earlier
            // occurrence only: if it is out of range, every older one is too.
            if let Some(&earlier) = last_index.get(value) {
                if (index - earlier) as i32 <= k {
                    return true;
                }
            }
            // Overwrite so the entry always holds the most recent position —
            // a first-occurrence map would miss later, closer pairs.
            last_index.insert(value, index);
        }
        false
    }
}
