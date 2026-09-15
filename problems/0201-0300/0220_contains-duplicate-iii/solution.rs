use std::collections::HashMap;

impl Solution {
    pub fn contains_nearby_almost_duplicate(nums: Vec<i64>, indexDiff: i64, valueDiff: i64) -> bool {
        // Value buckets of width valueDiff + 1, keyed by floor division: two
        // values in one bucket are within valueDiff by construction, so each
        // bucket holds at most one live value and a same-bucket hit is a "yes".
        let width = valueDiff + 1;
        let mut buckets: HashMap<i64, i64> = HashMap::new();
        for (index, &value) in nums.iter().enumerate() {
            if index as i64 > indexDiff {
                // The window spans only the previous indexDiff positions;
                // retire the bucket of the value that just fell out of it.
                let old = nums[index - indexDiff as usize - 1];
                buckets.remove(&old.div_euclid(width));
            }
            let bucket = value.div_euclid(width);
            if buckets.contains_key(&bucket) {
                return true;
            }
            // Neighbor buckets can hold values up to 2*valueDiff away, so
            // their occupants need a real distance comparison.
            if let Some(&below) = buckets.get(&(bucket - 1)) {
                if value - below <= valueDiff {
                    return true;
                }
            }
            if let Some(&above) = buckets.get(&(bucket + 1)) {
                if above - value <= valueDiff {
                    return true;
                }
            }
            buckets.insert(bucket, value);
        }
        false
    }
}
