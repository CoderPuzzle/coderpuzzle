impl Solution {
    pub fn num_dup_digits_at_most_n(n: i32) -> i32 {
        // Complement counting: tally numbers in [1, n] with all-distinct digits.
        let s = n.to_string();
        let digits: Vec<i32> = s.bytes().map(|b| (b - b'0') as i32).collect();
        let length = digits.len();

        // Every length strictly shorter than n's own length:
        // 9 first digits (no leading zero), then 9*8*7*...
        let mut distinct: i64 = 0;
        for d in 1..length {
            let mut prod: i64 = 9;
            for i in 1..d {
                prod *= (10 - i) as i64;
            }
            distinct += prod;
        }

        // Walk n's own digit string prefix by prefix.
        let mut used_mask: u32 = 0;
        let mut repeated = false;
        for i in 0..length {
            let digit = digits[i];
            let start = if i == 0 { 1 } else { 0 };
            // Each smaller unused candidate digit fixes a distinct prefix; the
            // remaining slots take any falling permutation of unused digits.
            let mut smaller: i64 = 0;
            for cand in start..digit {
                if used_mask & (1 << cand) == 0 {
                    smaller += 1;
                }
            }
            let remaining = length - i - 1;
            let mut perms: i64 = 1;
            let mut avail: i64 = 10 - (i as i64 + 1);
            for _ in 0..remaining {
                perms *= avail;
                avail -= 1;
            }
            distinct += smaller * perms;
            // A repeated digit here means no longer number shares this prefix.
            if used_mask & (1 << digit) != 0 {
                repeated = true;
                break;
            }
            used_mask |= 1 << digit;
        }
        // The walk never broke: n itself has all-distinct digits.
        if !repeated {
            distinct += 1;
        }

        (n as i64 - distinct) as i32
    }
}
