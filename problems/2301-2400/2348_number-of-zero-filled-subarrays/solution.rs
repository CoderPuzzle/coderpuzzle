impl Solution {
    // Every zero-filled subarray ends at exactly one index, and the ones
    // ending at i are exactly the run of consecutive zeros through i —
    // add the current run length at every zero. Totals reach ~5e9, so
    // accumulate in 64 bits.
    pub fn zero_filled_subarray(nums: Vec<i32>) -> i64 {
        let mut total: i64 = 0;
        let mut run: i64 = 0;
        for value in nums {
            if value == 0 {
                run += 1;
                total += run;
            } else {
                run = 0;
            }
        }
        total
    }
}
