impl Solution {
    // Every operation lowers the total sum by exactly 1, and the elements
    // only bound how many operations are even possible (sum in total),
    // never the residue. So the cheapest reachable sum that is divisible
    // by k is the largest multiple of k not exceeding the sum, and the
    // answer is the distance down to it: sum % k.
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        let mut total: i64 = 0;
        for v in &nums {
            total += *v as i64;
        }
        (total % k as i64) as i32
    }
}
