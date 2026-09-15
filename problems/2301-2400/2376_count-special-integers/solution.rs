impl Solution {
    pub fn count_special_numbers(n: i64) -> i32 {
        fn perm(a: i64, k: i64) -> i64 {
            let mut p: i64 = 1;
            for i in 0..k {
                p *= a - i;
            }
            p
        }

        let s = n.to_string();
        let digits: Vec<i64> = s.bytes().map(|b| (b - b'0') as i64).collect();
        let l = digits.len() as i64;
        let mut total: i64 = 0;
        // Part 1: shorter lengths are all below n. A k-digit special number
        // picks a nonzero first digit, then ordered picks of the remaining 9.
        for k in 1..l {
            total += 9 * perm(9, k - 1);
        }
        // Part 2: walk n's digits, holding the prefix equal to n so far;
        // `used` is the bitmask of digits fixed in that prefix.
        let mut used: u32 = 0;
        let mut broke = false;
        for i in 0..digits.len() {
            let d = digits[i];
            let lo: i64 = if i == 0 { 1 } else { 0 };
            // Try each digit x < d not yet used (x >= 1 at position 0 to bar
            // leading zeros): any completion works, so count the ordered
            // picks for the remaining L-i-1 positions from unused digits.
            let mut x = lo;
            while x < d {
                if (used >> x) & 1 == 0 {
                    total += perm(10 - (i as i64 + 1), l - i as i64 - 1);
                }
                x += 1;
            }
            // Extending with d itself repeats a digit: no same-length
            // special number shares this prefix, so the walk stops.
            if (used >> d) & 1 == 1 {
                broke = true;
                break;
            }
            used |= 1 << d;
        }
        if !broke {
            // The walk finished with no repeat, so n itself is special.
            total += 1;
        }
        total as i32
    }
}
