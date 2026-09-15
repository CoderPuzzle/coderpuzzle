impl Solution {
    pub fn min_operations(s: String) -> i32 {
        // Every occurrence of the chosen letter advances one step per
        // operation, so a letter whose zero-based alphabet index is i
        // needs (26 - i) % 26 operations of its own to reach 'a'.
        // Driving the letter with the largest remaining distance lets
        // slower letters catch up, merge, and ride along, so nothing
        // beyond that largest distance is ever paid.
        let mut best = 0;
        for ch in s.chars() {
            let need = (26 - (ch as i32 - 'a' as i32)) % 26;
            best = best.max(need);
        }
        best
    }
}
