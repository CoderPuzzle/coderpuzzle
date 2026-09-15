use std::collections::HashMap;

impl Solution {
    pub fn check_subarray_sum(nums: Vec<i32>, k: i32) -> bool {
        // Two prefixes with the same remainder mod k sandwich a subarray
        // whose sum is a multiple of k, so one pass keeps the running
        // remainder and the FIRST index it was seen at. The empty prefix
        // already has remainder 0 — seeding it at index -1 certifies
        // windows starting at index 0 and makes a zero-sum pair like
        // [0, 0] good, since 0 is a multiple of every k.
        let mut first_index = HashMap::from([(0, -1)]);
        let mut remainder = 0i32;
        for (index, value) in nums.iter().enumerate() {
            // values reach 1e9 and k reaches 2^31 - 1, so reduce in i64
            // before the remainder lands back inside i32 range.
            remainder = ((remainder as i64 + *value as i64) % k as i64) as i32;
            // A repeat is a good subarray only when it spans two or more
            // elements, and only the earliest occurrence gives the widest
            // span — keep first, never overwrite.
            if let Some(&earlier) = first_index.get(&remainder) {
                if index as i32 - earlier >= 2 {
                    return true;
                }
            }
            first_index.entry(remainder).or_insert(index as i32);
        }
        false
    }
}
