const MOD: i64 = 1_000_000_007;

impl Solution {
    pub fn count_stepping_numbers(low: String, high: String) -> i32 {
        // Both counts are residues in [0, MOD), so the rebalanced difference
        // is the residue the wire wants.
        let high_count = Self::count_up_to(high.as_bytes());
        let low_count = Self::count_up_to(&Self::decrement(low.as_bytes()));
        ((high_count - low_count + MOD) % MOD) as i32
    }

    // Stepping numbers in [1, bound], mod MOD; bound "0" gives 0.
    fn count_up_to(bound: &[u8]) -> i64 {
        if bound == b"0" {
            return 0;
        }
        let n = bound.len();
        // ways[m][d]: mod-count of ways to append m further digits after a
        // digit d, each differing by exactly 1 from its predecessor.
        let mut ways = vec![[0i64; 10]; n];
        ways[0] = [1; 10];
        for m in 1..n {
            for d in 0..10 {
                let mut total = 0;
                if d > 0 {
                    total = ways[m - 1][d - 1];
                }
                if d < 9 {
                    total += ways[m - 1][d + 1];
                }
                ways[m][d] = total % MOD;
            }
        }
        let mut count = 0;
        // Every length below n: first digit 1..9 (no leading zero), then any
        // completion.
        for length in 1..n {
            for d in 1..10 {
                count = (count + ways[length - 1][d]) % MOD;
            }
        }
        // Length n: walk the bound's digits under a tight flag. A smaller
        // digit at the first mismatching position settles the comparison; the
        // tail then completes in ways[n - 1 - i][choice] ways.
        let mut prev: i64 = -1;
        for i in 0..n {
            let digit = (bound[i] - b'0') as i64;
            let start = if i == 0 { 1 } else { 0 };
            for choice in start..digit {
                if prev < 0 || (choice - prev).abs() == 1 {
                    count = (count + ways[n - 1 - i][choice as usize]) % MOD;
                }
            }
            if prev >= 0 && (digit - prev).abs() != 1 {
                return count; // the equal-prefix chain is dead
            }
            prev = digit;
        }
        (count + 1) % MOD // the bound itself survived the walk
    }

    // value - 1 on a digit string (value >= 1); borrows turn 0s into 9s and
    // the collapsed leading digit is stripped.
    fn decrement(value: &[u8]) -> Vec<u8> {
        let mut digits = value.to_vec();
        let mut i = digits.len() - 1;
        while digits[i] == b'0' {
            digits[i] = b'9';
            i -= 1;
        }
        digits[i] -= 1;
        let first = digits.iter().position(|&d| d != b'0').unwrap_or(digits.len() - 1);
        digits[first..].to_vec()
    }
}
