impl Solution {
    pub fn max_num_of_marked_indices(nums: Vec<i32>) -> i32 {
        let mut a = nums;
        a.sort_unstable();
        let n = a.len();
        let mut i: usize = 0;
        // Large partners must come from the upper half: with p pairs the
        // smalls are p elements of the lower part and the larges p of the
        // upper, so j starts at the midpoint.
        for j in (n + 1) / 2..n {
            // Match in sorted order (exchange argument): pairing the smallest
            // remaining small with the smallest qualifying large never costs
            // a match, and i only advances on a successful pair.
            if 2i64 * a[i] as i64 <= a[j] as i64 {
                i += 1;
            }
        }
        // i counts pairs; every pair marks two indices.
        (2 * i) as i32
    }
}
