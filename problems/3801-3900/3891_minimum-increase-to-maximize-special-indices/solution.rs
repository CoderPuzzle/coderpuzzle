impl Solution {
    // Special indices are strict peaks that can only be raised, so two of them
    // can never be adjacent: the achievable maximum is a largest independent set
    // of the interior positions, and the cheapest such set is the answer.
    // Raising i above both original neighbours costs
    // max(0, max(nums[i-1], nums[i+1]) + 1 - nums[i]) — a peak's neighbours are
    // never peaks themselves, so they keep their original values.
    pub fn min_increase(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        const INF: i64 = 4_000_000_000_000_000_000;
        // Best (count, cost) pair up to the current position, keyed by whether
        // that position is picked; the comparison is (max count, min cost).
        let mut not_count = 0i32;
        let mut not_cost = 0i64;
        let mut pick_count = -1i32;
        let mut pick_cost = INF;
        for i in 1..n - 1 {
            let cost = (nums[i - 1].max(nums[i + 1]) as i64 + 1 - nums[i] as i64).max(0);
            // Picking i requires the previous position to be unpicked.
            let cur_pick_count = not_count + 1;
            let cur_pick_cost = not_cost + cost;
            // Skipping i keeps whichever previous state is better.
            let (cur_not_count, cur_not_cost) =
                if pick_count > not_count || (pick_count == not_count && pick_cost < not_cost) {
                    (pick_count, pick_cost)
                } else {
                    (not_count, not_cost)
                };
            not_count = cur_not_count;
            not_cost = cur_not_cost;
            pick_count = cur_pick_count;
            pick_cost = cur_pick_cost;
        }
        if pick_count > not_count || (pick_count == not_count && pick_cost < not_cost) {
            pick_cost
        } else {
            not_cost
        }
    }
}
