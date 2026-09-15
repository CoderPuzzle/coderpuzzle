impl Solution {
    pub fn maximum_and_sum(nums: Vec<i32>, num_slots: i32) -> i32 {
        // Model each slot as two individual positions: position p belongs to
        // slot p/2 + 1. numSlots <= 9 gives at most 18 positions, so 2^18
        // states exhaustively cover every assignment.
        let positions = (2 * num_slots) as usize;
        let size = 1usize << positions;
        let mut dp = vec![-1i32; size];
        dp[0] = 0;
        let mut best = 0;
        for mask in 0..size {
            // -1 marks unreachable masks.
            if dp[mask] < 0 {
                continue;
            }
            // popcount says how many numbers are placed, so the next number
            // is determined by the state — a fixed placement order is exact
            // because the sum is symmetric in the assignment.
            let i = mask.count_ones() as usize;
            if i == nums.len() {
                best = best.max(dp[mask]);
                continue;
            }
            for p in 0..positions {
                if mask & (1 << p) != 0 {
                    continue;
                }
                let nxt = dp[mask] + (nums[i] & (p as i32 / 2 + 1));
                let slot_mask = mask | (1 << p);
                if nxt > dp[slot_mask] {
                    dp[slot_mask] = nxt;
                }
            }
        }
        best
    }
}
