impl Solution {
    pub fn max_sum_two_no_overlap(nums: Vec<i32>, firstLen: i32, secondLen: i32) -> i32 {
        let n = nums.len();
        let mut prefix = vec![0i32; n + 1];
        for (i, &value) in nums.iter().enumerate() {
            prefix[i + 1] = prefix[i] + value;
        }

        // Sweep every position where the trailing window could end,
        // tracking the best leading window that ends at or before the
        // trailing window's start (so the two never overlap, whether they
        // touch or leave a gap between them).
        let best = |lead: i32, trail: i32| -> i32 {
            let lead = lead as usize;
            let trail = trail as usize;
            let mut max_lead = 0;
            let mut result = 0;
            for end in (lead + trail)..=n {
                let lead_sum = prefix[end - trail] - prefix[end - trail - lead];
                max_lead = max_lead.max(lead_sum);
                let trail_sum = prefix[end] - prefix[end - trail];
                result = result.max(max_lead + trail_sum);
            }
            result
        };

        // Try both relative orders: firstLen before secondLen, and
        // secondLen before firstLen. Skipping either one silently misses
        // inputs where the better placement runs the other way.
        best(firstLen, secondLen).max(best(secondLen, firstLen))
    }
}
