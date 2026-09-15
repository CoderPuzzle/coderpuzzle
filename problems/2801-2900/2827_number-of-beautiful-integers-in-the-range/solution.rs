impl Solution {
    pub fn number_of_beautiful_integers(low: i32, high: i32, k: i32) -> i32 {
        let k = k as usize;
        (Self::count_up_to(high as i64, k) - Self::count_up_to((low as i64) - 1, k)) as i32
    }

    // count_up_to(n) = beautiful integers in [1, n]; the answer is the
    // difference of the two bounds. f(0) returns 0, so low = 1 contributes
    // nothing on the low side.
    fn count_up_to(n: i64, k: usize) -> i64 {
        if n <= 0 {
            return 0;
        }
        let str = n.to_string();
        let digits: Vec<usize> = str.bytes().map(|b| (b - b'0') as usize).collect();
        let len = digits.len();
        let mut memo = vec![-1i64; 11 * 2 * 2 * 21 * k];

        fn dp(
            pos: usize,
            tight: usize,
            started: usize,
            balance: i32,
            mod_: usize,
            digits: &[usize],
            k: usize,
            memo: &mut Vec<i64>,
        ) -> i64 {
            // Digit DP tracking everything the two conditions need: balance
            // (odd digits minus even digits written so far) and value mod k.
            // Memoization shares all loose subproblems, so the recursion
            // enumerates states, not numbers.
            if pos == digits.len() {
                return if started == 1 && balance == 0 && mod_ == 0 {
                    1
                } else {
                    0
                };
            }
            let key = ((pos * 2 + tight) * 2 + started) * 21 * k + (balance as usize + 10) * k + mod_;
            if memo[key] >= 0 {
                return memo[key];
            }
            // tight: prefix still equals the bound's, capping this digit.
            let limit = if tight == 1 { digits[pos] } else { 9 };
            let mut total: i64 = 0;
            for d in 0..=limit {
                let next_tight = if tight == 1 && d == limit { 1 } else { 0 };
                // A leading zero writes nothing: it leaves the balance
                // untouched and does not count as an even digit.
                if started == 0 && d == 0 {
                    total += dp(pos + 1, next_tight, 0, balance, (mod_ * 10 + d) % k, digits, k, memo);
                } else {
                    let new_balance = balance + if d % 2 == 1 { 1 } else { -1 };
                    total += dp(
                        pos + 1,
                        next_tight,
                        1,
                        new_balance,
                        (mod_ * 10 + d) % k,
                        digits,
                        k,
                        memo,
                    );
                }
            }
            memo[key] = total;
            total
        }

        dp(0, 1, 0, 0, 0, &digits, k, &mut memo)
    }
}
