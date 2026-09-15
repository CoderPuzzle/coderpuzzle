impl Solution {
    pub fn nearest_palindromic(n: String) -> String {
        // A palindrome is fixed by its first half, so the palindromes
        // nearest n nearly share n's own half: mirror the half, and the
        // half +/- 1, for at most three same-width candidates. The +/- 1
        // step can leave the width (10...0 decremented, 9...9 incremented);
        // those neighbors are the boundary candidates 10^(L-1) - 1 (all 9s,
        // one digit shorter) and 10^L + 1 (1, zeros, 1).
        let length = n.len();
        let half = (length + 1) / 2;
        let prefix: i64 = n[..half].parse().expect("n is a decimal integer");
        let mut candidates: Vec<String> = Vec::with_capacity(5);
        for delta in [-1, 0, 1] {
            let shifted = (prefix + delta).to_string();
            // A half that no longer has exactly `half` digits would mirror
            // onto leading zeros - the boundary candidates own that ground.
            if shifted.len() != half || (shifted == "0" && length > 1) {
                continue;
            }
            let head: String = shifted[..length - half].chars().rev().collect();
            candidates.push(shifted + &head);
        }
        if length == 1 {
            candidates.push("0".to_string());
        } else {
            candidates.push("9".repeat(length - 1));
        }
        candidates.push(format!("1{}1", "0".repeat(length - 1)));

        // Everything fits a signed 64-bit integer: n is below 10^18, the
        // widest candidate is 10^18 + 1, and no distance passes
        // 9 * 10^17 + 1 - an order of magnitude inside i64's
        // 9.22 * 10^18 ceiling.
        let value: i64 = n.parse().expect("n is a decimal integer");
        let mut best = String::new();
        let mut best_value = 0;
        let mut best_distance = 0;
        for candidate in &candidates {
            let candidate_value: i64 = candidate.parse().expect("candidate is a decimal integer");
            if candidate_value == value {
                continue; // n itself never counts
            }
            let distance = (candidate_value - value).abs();
            if best.is_empty()
                || distance < best_distance
                || (distance == best_distance && candidate_value < best_value)
            {
                best = candidate.clone();
                best_value = candidate_value;
                best_distance = distance;
            }
        }
        best
    }
}
