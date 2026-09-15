impl Solution {
    // Sliding window: once arr[lo] + arr[hi] <= limit, every index between
    // lo and hi pairs with lo as well, worth hi - lo pairs. Sums touch
    // +-2e9 and answers reach C(n,2) ~= 5e9, both beyond 32-bit, so the
    // arithmetic widens to i64.
    fn count_at_most(arr: &[i32], limit: i64) -> i64 {
        let mut total: i64 = 0;
        let mut lo: usize = 0;
        let mut hi = arr.len() as i64 - 1;
        while (lo as i64) < hi {
            if arr[lo] as i64 + arr[hi as usize] as i64 <= limit {
                total += hi - lo as i64;
                lo += 1;
            } else {
                hi -= 1;
            }
        }
        total
    }

    pub fn count_fair_pairs(nums: Vec<i32>, lower: i32, upper: i32) -> i64 {
        // Sorting discards index identity, but fairness only depends on
        // values: counting ordered positions i < j in the sorted array
        // counts each original pair exactly once.
        let mut arr = nums.clone();
        arr.sort_unstable();
        Self::count_at_most(&arr, upper as i64) - Self::count_at_most(&arr, lower as i64 - 1)
    }
}
