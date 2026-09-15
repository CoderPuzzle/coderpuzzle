impl Solution {
    pub fn min_swaps(s: String) -> i32 {
        // One pass: track the running balance of '[' minus ']'. Whenever the
        // balance goes negative, the current prefix is impossible to balance
        // without a swap, so swap the offending ']' with the last '[' — which
        // is exactly what a single counter models by bumping balance up by 2.
        let mut balance = 0;
        let mut swaps = 0;
        for c in s.chars() {
            if c == '[' {
                balance += 1;
            } else {
                balance -= 1;
            }
            if balance < 0 {
                swaps += 1;
                balance += 2;
            }
        }
        swaps
    }
}
