impl Solution {
    pub fn find_maximum_xor(nums: Vec<i32>) -> i32 {
        let mut best: i32 = 0;
        let mut mask: i32 = 0;
        // Decide each answer bit from the MSB down: a set higher bit
        // dominates all lower bits, so keep it whenever some pair achieves it.
        for bit in (0..=30).rev() {
            mask |= 1 << bit;
            // Prefixes = numbers truncated to the bits considered so far.
            let mut prefixes = std::collections::HashSet::new();
            for &value in &nums {
                prefixes.insert(value & mask);
            }
            let candidate = best | (1 << bit);
            // Achievable iff two prefixes XOR to candidate, i.e.
            // candidate ^ prefix is itself a prefix.
            let mut found = false;
            for &prefix in &prefixes {
                if prefixes.contains(&(candidate ^ prefix)) {
                    found = true;
                    break;
                }
            }
            if found {
                best = candidate;
            }
        }
        best
    }
}
