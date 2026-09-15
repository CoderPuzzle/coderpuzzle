impl Solution {
    // The best play always re-takes the current maximum: any smaller
    // pick leaves a strictly larger value untouched for later, so the
    // taken sequence is m, m+1, ..., m+k-1 -- an arithmetic series with
    // step 1 starting at the array's maximum m.
    pub fn maximize_sum(nums: Vec<i32>, k: i32) -> i32 {
        let m = *nums.iter().max().unwrap();
        k * m + k * (k - 1) / 2
    }
}
