impl Solution {
    // A whole run of equal neighbors shares one pair of closest
    // non-equal neighbors, so collapsing each maximal run of equal
    // values to a single representative turns "count hills and
    // valleys, once per run" into "count interior local extrema" of
    // the compressed sequence. The endpoints of the compressed
    // sequence are missing a non-equal neighbor on one side, which
    // the interior-only loop encodes exactly.
    pub fn count_hill_valley(nums: Vec<i32>) -> i32 {
        let mut compressed = vec![nums[0]];
        for &value in &nums[1..] {
            if value != *compressed.last().unwrap() {
                compressed.push(value);
            }
        }
        let mut count = 0;
        for i in 1..compressed.len() - 1 {
            let (left, mid, right) = (compressed[i - 1], compressed[i], compressed[i + 1]);
            if (mid > left && mid > right) || (mid < left && mid < right) {
                count += 1;
            }
        }
        count
    }
}
