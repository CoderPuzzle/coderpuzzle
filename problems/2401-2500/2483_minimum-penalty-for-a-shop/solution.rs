impl Solution {
    pub fn best_closing_time(customers: String) -> i32 {
        // penalty at closing hour j = (#'N' in customers[:j]) + (#'Y' in customers[j:])
        let bytes = customers.as_bytes();
        let mut prefix_n: i32 = 0;
        let mut suffix_y: i32 = 0;
        for &b in bytes {
            if b == b'Y' {
                suffix_y += 1;
            }
        }
        let mut best_j: i32 = 0;
        let mut best_penalty = prefix_n + suffix_y;
        for j in 1..=bytes.len() {
            if bytes[j - 1] == b'N' {
                prefix_n += 1;
            } else {
                suffix_y -= 1;
            }
            let penalty = prefix_n + suffix_y;
            if penalty < best_penalty {
                best_penalty = penalty;
                best_j = j as i32;
            }
        }
        best_j
    }
}
