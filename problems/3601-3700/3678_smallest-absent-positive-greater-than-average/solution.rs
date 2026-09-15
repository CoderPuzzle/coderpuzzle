use std::collections::HashSet;

impl Solution {
    pub fn smallest_absent(nums: Vec<i32>) -> i32 {
        // A hash set turns "is candidate c present in nums?" into an O(1)
        // lookup, so the answer is found by walking upward from 1.
        let present: HashSet<i32> = nums.iter().copied().collect();
        let total: i64 = nums.iter().map(|&value| value as i64).sum();
        let n = nums.len() as i64;
        // Skip candidates at or below the average: candidate > total/n is
        // tested as candidate * n > total, an exact integer comparison --
        // equality fails it, so an integral average excludes itself. The
        // walk starts at 1 because the answer must be positive. The sum is
        // accumulated in 64 bits even though it fits in 32 here.
        let mut candidate: i64 = 1;
        while candidate * n <= total {
            candidate += 1;
        }
        while present.contains(&(candidate as i32)) {
            candidate += 1;
        }
        candidate as i32
    }
}
