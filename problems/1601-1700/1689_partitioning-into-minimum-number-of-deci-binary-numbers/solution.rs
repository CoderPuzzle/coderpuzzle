impl Solution {
    // Every deci-binary summand contributes at most 1 to any one digit
    // position, so k summands leave every digit <= k — the answer is at
    // least the largest digit. Subtracting one deci-binary layer per pass
    // (a 1 under every still-positive digit) attains that bound exactly,
    // so the answer is the largest digit: scan for it.
    pub fn min_partitions(n: String) -> i32 {
        let mut best = 0;
        for ch in n.chars() {
            best = best.max(ch.to_digit(10).unwrap() as i32);
        }
        best
    }
}
