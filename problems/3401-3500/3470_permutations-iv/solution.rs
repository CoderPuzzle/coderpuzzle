impl Solution {
    pub fn permute(n: i32, mut k: i64) -> Vec<i32> {
        // Counts only ever face comparison against k (<= 1e15), so the
        // factorials may saturate at a cap above 1e15: a saturated count
        // still reads as "more permutations than k needs".
        const CAP: i64 = 2_000_000_000_000_000;
        let n = n as usize;
        let half = (n + 1) / 2;
        let mut fact = vec![1i64; half + 1];
        for i in 2..=half {
            fact[i] = mul_cap(fact[i - 1], i as i64, CAP);
        }
        let mut result: Vec<i32> = Vec::with_capacity(n);
        // One flag per value: the greedy consumes each of 1..n at most once.
        let mut used = vec![false; n + 1];
        let mut odds_left = (n + 1) / 2;
        let mut evens_left = n / 2;
        let mut last_parity = -1;
        for depth in 0..n {
            // Ascending candidates: skip past the ones whose completion
            // count is too small to still hold k, reducing k by their size.
            let mut placed = false;
            for value in 1..=n {
                if used[value] || value as i32 % 2 == last_parity {
                    continue;
                }
                let odd = odds_left - (value % 2);
                let even = evens_left - (1 - value % 2);
                // Once this value lands, the remaining parity pattern is
                // forced: the slots alternate starting with the opposite
                // parity, so the count is odd! * even! exactly when the
                // leftover values fit that pattern, and 0 otherwise.
                let rest = n - depth - 1;
                let odd_slots = (rest + 1 - value % 2) / 2;
                let mut ways = 0;
                if odd_slots == odd && rest - odd_slots == even {
                    ways = mul_cap(fact[odd], fact[even], CAP);
                }
                if ways >= k {
                    used[value] = true;
                    result.push(value as i32);
                    if value % 2 == 1 {
                        odds_left -= 1;
                    } else {
                        evens_left -= 1;
                    }
                    last_parity = (value % 2) as i32;
                    placed = true;
                    break;
                }
                k -= ways;
            }
            if !placed {
                // Fewer than k alternating permutations exist.
                return Vec::new();
            }
        }
        result
    }
}

// Saturating product: a result above the cap is indistinguishable from the
// cap itself, so the guard avoids overflowing i64 before multiplying.
fn mul_cap(a: i64, b: i64, cap: i64) -> i64 {
    if a > cap / b {
        cap
    } else {
        a * b
    }
}
