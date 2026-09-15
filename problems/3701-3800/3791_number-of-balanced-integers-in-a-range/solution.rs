impl Solution {
    pub fn count_balanced(low: i64, high: i64) -> i64 {
        Self::count_up_to(high) - Self::count_up_to(low - 1)
    }

    fn count_up_to(x: i64) -> i64 {
        if x < 10 {
            return 0;
        }
        let s = x.to_string();
        let s = s.as_bytes();
        let n = s.len();
        let span = 9 * n;
        let size = 2 * span + 1;
        // ways[i][t + span]: assignments of slots i..n-1 with free digits
        // 0..9 whose signed sum is t (slot j contributes +digit when j is
        // even and -digit when j is odd, 0-based from the left). Counts
        // reach 10^15 + 1, past 32 bits, so the table holds i64s.
        let mut ways = vec![vec![0i64; size]; n + 1];
        ways[n][span] = 1;
        for i in (0..n).rev() {
            let sign: isize = if i % 2 == 0 { 1 } else { -1 };
            for t in -(span as isize)..=(span as isize) {
                let mut total = 0i64;
                for d in 0..10isize {
                    let u = t - sign * d;
                    if -(span as isize) <= u && u <= span as isize {
                        total += ways[i + 1][(u + span as isize) as usize];
                    }
                }
                ways[i][(t + span as isize) as usize] = total;
            }
        }
        let mut count = 0i64;
        let mut diff: isize = 0;
        for i in 0..n {
            let v = (s[i] - b'0') as isize;
            let sign: isize = if i % 2 == 0 { 1 } else { -1 };
            // A digit below x's own fixes a smaller prefix forever, so
            // the freed tail counts whenever it can cancel the running
            // difference; x's digit itself keeps the walk tight.
            for c in 0..v {
                let u = -diff - sign * c;
                if -(span as isize) <= u && u <= span as isize {
                    count += ways[i + 1][(u + span as isize) as usize];
                }
            }
            diff += sign * v;
        }
        if diff == 0 {
            count += 1;
        }
        // Padding with leading zeros preserves "alternating sum is
        // zero" exactly for balanced numbers, but lets m = 0 slip in;
        // it is the only non-balanced value ever counted, so drop it.
        count - 1
    }
}
