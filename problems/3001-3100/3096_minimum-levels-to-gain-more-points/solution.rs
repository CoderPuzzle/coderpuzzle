impl Solution {
    pub fn minimum_levels(possible: Vec<i32>) -> i32 {
        // Map cleared levels to +1 and failed ones to -1. A split after t
        // levels wins exactly when 2 * prefix(t) > total: Alice's points
        // are her prefix sum, Bob's the remaining suffix, and she ends
        // strictly ahead iff the two differ by more than zero in either
        // direction.
        let mut total = 0;
        for &value in &possible {
            total += if value == 1 { 1 } else { -1 };
        }
        let mut prefix = 0;
        // Scan splits ascending; Bob must play at least one level, so the
        // loop stops one short of the last element.
        for i in 0..possible.len() - 1 {
            prefix += if possible[i] == 1 { 1 } else { -1 };
            if 2 * prefix > total {
                return i as i32 + 1;
            }
        }
        -1
    }
}
