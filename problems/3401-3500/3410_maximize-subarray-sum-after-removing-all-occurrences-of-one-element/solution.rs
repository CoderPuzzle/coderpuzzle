impl Solution {
    pub fn max_subarray_sum(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        // Deleting the only element is forbidden, so its value stands.
        if n == 1 {
            return nums[0] as i64;
        }
        // Per-candidate account: smallest adjusted prefix P(j) minus the |x|'s
        // deleted after j. Key 0 is the plain no-deletion prefix minimum.
        // prefixMap keyed by the deleted value; key 0 tracks min prefix sum.
        let mut prefix_map: std::collections::HashMap<i64, i64> = std::collections::HashMap::new();
        prefix_map.insert(0, 0);
        let mut prefix_sum = 0i64;
        let mut min_prefix = 0i64;
        // Seeded with nums[0] so all-negative arrays need no zero sentinel.
        let mut result = nums[0] as i64;
        for &num in &nums {
            let num = num as i64;
            prefix_sum += num;
            // Best subarray ending at r: P(r) minus the smallest adjusted prefix
            // seen so far. Runs before num joins any account, so every anchor
            // strictly precedes r and the subarray is never empty.
            if prefix_sum - min_prefix > result {
                result = prefix_sum - min_prefix;
            }
            // Only a negative x can help: deleting a positive would only
            // shrink every subarray sum.
            if num < 0 {
                // Anchor at min(old account, plain prefix min) and subtract |x|
                // again: the deletion window may restart at this occurrence.
                let p0 = prefix_map[&0];
                let val = match prefix_map.get(&num) {
                    Some(&prev) => p0.min(prev) + num,
                    None => p0 + num,
                };
                prefix_map.insert(num, val);
                if val < min_prefix {
                    min_prefix = val;
                }
            }
            if prefix_sum < prefix_map[&0] {
                prefix_map.insert(0, prefix_sum);
            }
            if prefix_map[&0] < min_prefix {
                min_prefix = prefix_map[&0];
            }
        }
        result
    }
}
