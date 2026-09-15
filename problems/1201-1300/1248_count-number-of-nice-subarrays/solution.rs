impl Solution {
    pub fn number_of_subarrays(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        // counts[c] = how many earlier prefixes had odd-count c; seeding the
        // empty prefix at 0 makes subarrays starting at index 0 countable.
        let mut counts = vec![0i64; n + 1];
        counts[0] = 1;
        let mut odds = 0usize;
        let mut result: i64 = 0;
        for &x in &nums {
            // Only parity matters (odd->1, even->0), so "exactly k odds"
            // becomes the classic "subarray with sum exactly k".
            odds += (x & 1) as usize;
            // Every earlier prefix with odds - k pairs with the current one
            // to close one nice subarray; the guard just avoids a negative
            // index before enough odds have accumulated.
            if odds as i64 - k as i64 >= 0 {
                result += counts[odds - k as usize];
            }
            counts[odds] += 1;
        }
        result as i32
    }
}
