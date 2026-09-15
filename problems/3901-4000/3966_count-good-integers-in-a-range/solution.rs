impl Solution {
    pub fn good_integers(l: i64, r: i64, k: i32) -> i64 {
        Self::count_good(r, k) - Self::count_good(l - 1, k)
    }

    fn count_good(x: i64, k: i32) -> i64 {
        if x < 0 {
            return 0;
        }
        let s = x.to_string();
        let digits: Vec<i32> = s.chars().map(|c| c as i32 - '0' as i32).collect();
        let n = digits.len();
        // memo[pos][tight][prev+1][started]; prev index 0 = unused
        let mut memo = vec![vec![vec![vec![-1i64; 2]; 11]; 2]; n + 1];
        Self::dp(0, 1, 0, 0, &digits, k, &mut memo)
    }

    fn dp(
        pos: usize,
        tight: i32,
        prev: i32,
        started: i32,
        digits: &[i32],
        k: i32,
        memo: &mut Vec<Vec<Vec<Vec<i64>>>>,
    ) -> i64 {
        if pos == digits.len() {
            return 1;
        }
        let slot = memo[pos][tight as usize][(prev + 1) as usize][started as usize];
        if slot != -1 {
            return slot;
        }
        let limit = if tight == 1 { digits[pos] } else { 9 };
        let mut total = 0i64;
        for d in 0..=limit {
            let ntight = if tight == 1 && d == limit { 1 } else { 0 };
            if started == 0 && d == 0 {
                total += Self::dp(pos + 1, ntight, 0, 0, digits, k, memo);
            } else {
                if started == 1 && (d - prev).abs() > k {
                    continue;
                }
                total += Self::dp(pos + 1, ntight, d, 1, digits, k, memo);
            }
        }
        memo[pos][tight as usize][(prev + 1) as usize][started as usize] = total;
        total
    }
}
