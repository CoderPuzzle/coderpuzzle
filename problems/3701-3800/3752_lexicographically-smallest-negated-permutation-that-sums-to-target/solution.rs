impl Solution {
    pub fn lex_smallest_negated_perm(n: i32, target: i64) -> Vec<i32> {
        // The all-positive baseline [1, 2, ..., n] sums to S. Negating x
        // lowers the sum by 2 * x, so target is reachable exactly when it
        // lies in [-S, S] with the same parity as S. S reaches ~5 * 10^9,
        // which overflows i32 — the deficit math runs in i64.
        let n = n as i64;
        let total = n * (n + 1) / 2;
        if target < -total || target > total || (total - target) % 2 != 0 {
            return Vec::new();
        }
        let mut deficit = (total - target) / 2;
        let mut negated = vec![false; (n + 1) as usize];
        // Greedily negate the largest values first; this is what puts the
        // most negative element at the front of the answer.
        for value in (1..=n).rev() {
            if value <= deficit {
                negated[value as usize] = true;
                deficit -= value;
            }
        }
        let mut result = Vec::with_capacity(n as usize);
        for value in (1..=n).rev() {
            if negated[value as usize] {
                result.push(-value as i32);
            }
        }
        for value in 1..=n {
            if !negated[value as usize] {
                result.push(value as i32);
            }
        }
        result
    }
}
