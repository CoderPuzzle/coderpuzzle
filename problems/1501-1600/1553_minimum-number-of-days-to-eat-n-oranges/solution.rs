use std::collections::HashMap;

impl Solution {
    pub fn min_days(n: i32) -> i32 {
        // Two moves are ever worth trying from a pile of more than one
        // orange: pay off the remainder mod 2 in single-orange days and
        // then halve, or pay off the remainder mod 3 and take the 2n/3
        // bite. The reachable states from n are the O(log^2 n) numbers
        // produced by repeatedly floor-dividing by 2 or 3, so a hash-map
        // memo keeps the recursion small even for n up to 2 * 10^9.
        let mut memo: HashMap<i32, i32> = HashMap::new();
        Self::dp(n, &mut memo)
    }

    fn dp(remaining: i32, memo: &mut HashMap<i32, i32>) -> i32 {
        if remaining <= 1 {
            return remaining;
        }
        if let Some(&days) = memo.get(&remaining) {
            return days;
        }
        let days =
            (remaining % 2 + 1 + Self::dp(remaining / 2, memo)).min(remaining % 3 + 1 + Self::dp(remaining / 3, memo));
        memo.insert(remaining, days);
        days
    }
}
