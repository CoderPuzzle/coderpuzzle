impl Solution {
    pub fn integer_replacement(n: i32) -> i32 {
        // i64, not i32: the +1 arm at n = 2^31 - 1 computes 2^31.
        Self::replace(n as i64)
    }

    fn replace(n: i64) -> i32 {
        // Even n has one move: halve it. An odd n is decided by its low two
        // bits. ...01 (n % 4 == 1) decrements for free — the low 1 clears and
        // the next halving rides a longer run of zeros, while +1 would carry
        // into bits that are already 0. ...11 (n % 4 == 3) increments: the
        // carry collapses the whole trailing run of 1s into one higher bit,
        // retiring every 1 in it at once. n == 3 is the exception —
        // 3 - 1 -> 2 -> 1 takes two steps where 3 + 1 -> 4 -> 2 -> 1 takes
        // three.
        if n == 1 {
            return 0;
        }
        if n % 2 == 0 {
            return 1 + Self::replace(n / 2);
        }
        if n == 3 || n % 4 == 1 {
            return 1 + Self::replace(n - 1);
        }
        1 + Self::replace(n + 1)
    }
}
