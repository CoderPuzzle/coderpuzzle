impl Solution {
    pub fn distribute_candies(n: i32, limit: i32) -> i32 {
        // Fix the first child's share, then the other two just need b + c
        // = rest with both halves capped: the valid b values form the
        // consecutive range [max(0, rest - limit), min(limit, rest)]. The
        // count never exceeds C(52, 2) = 1326, well inside i32 range.
        let mut total = 0;
        let upper = n.min(limit);
        for first in 0..=upper {
            let rest = n - first;
            let low = 0.max(rest - limit);
            let high = limit.min(rest);
            if high >= low {
                total += high - low + 1;
            }
        }
        total
    }
}
