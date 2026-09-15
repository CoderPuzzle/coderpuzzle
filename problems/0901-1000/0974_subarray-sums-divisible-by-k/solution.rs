impl Solution {
    pub fn subarrays_div_by_k(nums: Vec<i32>, k: i32) -> i32 {
        // A subarray's sum is the difference of two prefix sums, and that
        // difference is divisible by k exactly when both prefixes leave the
        // same remainder. An array counting each normalized remainder seen
        // so far, seeded with the empty prefix's 0, answers the lookup in
        // O(1) per step.
        let mut count = 0i32;
        let mut prefix = 0i32;
        let mut remainders = vec![0i32; k as usize];
        remainders[0] = 1;
        for &value in &nums {
            prefix += value;
            let r = prefix.rem_euclid(k) as usize;
            count += remainders[r];
            remainders[r] += 1;
        }
        count
    }
}
