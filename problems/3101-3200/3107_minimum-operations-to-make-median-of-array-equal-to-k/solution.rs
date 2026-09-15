impl Solution {
    // After sorting, the median slot is n/2: the middle element for odd n
    // and the larger of the two middles for even n, matching the
    // statement's definition. Elements left of the slot above k must come
    // down to k; elements right of it below k must come up. The total
    // reaches ~2*10**14 at the constraint maximum, so the count lives in
    // an i64.
    pub fn min_operations_to_make_median_k(nums: Vec<i32>, k: i32) -> i64 {
        let mut nums = nums;
        nums.sort_unstable();
        let k = k as i64;
        let mid = nums.len() / 2;
        let mut total = (nums[mid] as i64 - k).abs();
        for &v in &nums[..mid] {
            let excess = v as i64 - k;
            if excess > 0 {
                total += excess;
            }
        }
        for &v in &nums[mid + 1..] {
            let shortfall = k - v as i64;
            if shortfall > 0 {
                total += shortfall;
            }
        }
        total
    }
}
