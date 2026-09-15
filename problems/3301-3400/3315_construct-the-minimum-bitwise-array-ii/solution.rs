impl Solution {
    pub fn min_bitwise_array(nums: Vec<i32>) -> Vec<i32> {
        // a OR (a + 1) always ends in a 1 bit, hence odd -- the only even
        // prime is 2, which reports -1. For odd x the minimum clears the
        // highest bit of x's trailing run of 1s: its lower neighbors stay 1
        // in a, so a + 1 carries exactly onto the cleared bit and
        // a OR (a + 1) rebuilds x, while clearing any lower bit of the run
        // leaves a larger candidate. The cleared bit is half the lowest set
        // bit of x + 1, since x + 1 zeros the whole run. Values stay below
        // 1e9 + 1, inside i32 range.
        nums.iter()
            .map(|&x| {
                if x % 2 == 0 {
                    -1
                } else {
                    let v = x + 1;
                    x - ((v & -v) >> 1)
                }
            })
            .collect()
    }
}
