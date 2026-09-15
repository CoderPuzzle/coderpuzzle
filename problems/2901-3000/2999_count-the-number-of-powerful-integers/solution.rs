impl Solution {
    pub fn number_of_powerful_int(start: i64, finish: i64, limit: i32, s: String) -> i64 {
        let lim = limit as i64;
        Self::count_powerful(finish, lim, &s) - Self::count_powerful(start - 1, lim, &s)
    }

    fn count_powerful(x: i64, lim: i64, s: &str) -> i64 {
        if x <= 0 {
            return 0;
        }
        let n = x.to_string().len();
        let len_s = s.len();
        if len_s > n {
            return 0;
        }
        let sv: i64 = s.parse().unwrap();
        if x < sv {
            return 0;
        }
        let cap = (x - sv) / Self::pow10(len_s as u32);
        let mut total: i64 = 1; // the number s itself (empty prefix)
        for p in 1..=(n - len_s) {
            total += Self::count_exact_len(p, cap, lim);
        }
        total
    }

    // number of integers with exactly p digits, every digit <= lim, <= cap
    fn count_exact_len(p: usize, cap: i64, lim: i64) -> i64 {
        if cap < Self::pow10(p as u32 - 1) {
            return 0;
        }
        if cap >= Self::pow10(p as u32) - 1 {
            let mut res = lim;
            for _ in 0..p - 1 {
                res *= lim + 1;
            }
            return res;
        }
        let str = cap.to_string();
        let cap_digits: Vec<i64> = str.bytes().map(|b| (b - b'0') as i64).collect();

        let mut memo = vec![[-1i64; 2]; p + 1];
        Self::dp(0, 1, p, &cap_digits, lim, &mut memo)
    }

    fn dp(pos: usize, tight: usize, p: usize, cap_digits: &[i64], lim: i64, memo: &mut Vec<[i64; 2]>) -> i64 {
        if pos == p {
            return 1;
        }
        if memo[pos][tight] >= 0 {
            return memo[pos][tight];
        }
        let up = if tight == 1 { cap_digits[pos] } else { 9 };
        let lo = if pos == 0 { 1 } else { 0 };
        let hi = up.min(lim);
        let mut total: i64 = 0;
        for d in lo..=hi {
            let next_tight = if tight == 1 && d == up { 1 } else { 0 };
            total += Self::dp(pos + 1, next_tight, p, cap_digits, lim, memo);
        }
        memo[pos][tight] = total;
        total
    }

    fn pow10(e: u32) -> i64 {
        let mut r: i64 = 1;
        for _ in 0..e {
            r *= 10;
        }
        r
    }
}
