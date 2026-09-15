impl Solution {
    pub fn four_sum_count(nums1: Vec<i32>, nums2: Vec<i32>, nums3: Vec<i32>, nums4: Vec<i32>) -> i32 {
        // Same split as the hash-map version -- a+b+c+d = 0 iff a+b = -(c+d)
        // -- but the join is ordered ground rather than a table: materialise
        // both halves' pair sums and sort the right one.
        let mut left: Vec<i32> = Vec::with_capacity(nums1.len() * nums2.len());
        for &a in &nums1 {
            for &b in &nums2 {
                left.push(a + b);
            }
        }
        let mut right: Vec<i32> = Vec::with_capacity(nums3.len() * nums4.len());
        for &c in &nums3 {
            for &d in &nums4 {
                right.push(c + d);
            }
        }
        right.sort_unstable();
        // Each left sum asks "how many right sums equal my negation?"; on a
        // sorted array a pair of binary searches brackets exactly that run.
        // Counts can reach n^4 = 1.6e9, so the tally widens to 64 bits.
        let mut total: i64 = 0;
        for &sum in &left {
            let negated = -sum;
            let lower = right.partition_point(|&value| value < negated);
            let upper = right.partition_point(|&value| value <= negated);
            total += (upper - lower) as i64;
        }
        total as i32
    }
}
