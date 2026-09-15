impl Solution {
    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    pub fn digits_count(d: i32, low: i32, high: i32) -> i32 {
        (Self::count_up_to(d, high as i64) - Self::count_up_to(d, low as i64 - 1)) as i32
    }

    fn count_up_to(d: i32, n: i64) -> i64 {
        if n <= 0 {
            return 0;
        }
        let s = n.to_string();
        let digits: Vec<i64> = s.bytes().map(|b| (b - b'0') as i64).collect();
        // Free (non-tight) suffixes recur, so they are memoized per
        // (position, started): (completions, occurrences) pairs.
        let mut memo: Vec<Vec<Option<(i64, i64)>>> = vec![vec![None; 2]; digits.len()];
        // The all-zero completion is the number 0 and carries no
        // appearances, so the walk tallies exactly the integers 1..n.
        Self::solve(&digits, d as i64, 0, true, false, &mut memo).1
    }

    // Each state reports how many suffix completions it admits and how many
    // appearances of d those completions contain.
    fn solve(
        digits: &[i64],
        d: i64,
        pos: usize,
        tight: bool,
        started: bool,
        memo: &mut Vec<Vec<Option<(i64, i64)>>>,
    ) -> (i64, i64) {
        if pos == digits.len() {
            return (1, 0);
        }
        let started_idx = if started { 1 } else { 0 };
        if !tight {
            if let Some(cached) = memo[pos][started_idx] {
                return cached;
            }
        }
        let max_digit = if tight { digits[pos] } else { 9 };
        let mut completions: i64 = 0;
        let mut occurrences: i64 = 0;
        for digit in 0..=max_digit {
            let inner = Self::solve(
                digits,
                d,
                pos + 1,
                tight && digit == max_digit,
                started || digit > 0,
                memo,
            );
            completions += inner.0;
            occurrences += inner.1;
            // Placing d here shows d in every completion below, unless it is
            // a leading zero -- those are never written.
            if digit == d && (started || digit > 0) {
                occurrences += inner.0;
            }
        }
        let state = (completions, occurrences);
        if !tight {
            memo[pos][started_idx] = Some(state);
        }
        state
    }
}
