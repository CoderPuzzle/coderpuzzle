impl Solution {
    pub fn max_k_distinct(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut distinct = nums;
        // A duplicate can never be picked twice and never beats an unused
        // value, so only the set of distinct values matters; sort + dedup
        // collapses nums in place.
        distinct.sort_unstable();
        distinct.dedup();
        // Descending order lines the largest values up first; truncate to k,
        // which keeps every value when fewer than k exist.
        distinct.reverse();
        distinct.truncate(k as usize);
        distinct
    }
}
