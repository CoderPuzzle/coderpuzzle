impl Solution {
    // First index whose digit sum equals the index wins, so a single
    // left-to-right scan with an early return is all there is. Values
    // are at most 1000, so each digit sum is at most 27 -- well below
    // any index bound of 100.
    pub fn smallest_index(nums: Vec<i32>) -> i32 {
        for (i, &v) in nums.iter().enumerate() {
            let mut s = 0;
            let mut v = v;
            while v > 0 {
                s += v % 10;
                v /= 10;
            }
            if s == i as i32 {
                return i as i32;
            }
        }
        -1
    }
}
