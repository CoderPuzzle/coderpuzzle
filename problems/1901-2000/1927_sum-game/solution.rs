impl Solution {
    pub fn sum_game(num: String) -> bool {
        // Track f = 2*diff + 9*k where diff is (left sum - right sum) over
        // fixed digits and k = (#'?' left) - (#'?' right). Every fill changes
        // f by an odd offset in [-9, 9] regardless of side. Alice wins iff
        // f != 0: she pushes +9 each turn, Bob can cancel at most -9 per
        // reply, and Bob holds f at 0 by mirroring whenever it starts there.
        let bytes = num.as_bytes();
        let n = bytes.len();
        let mut diff: i64 = 0;
        let mut k: i64 = 0;
        for (i, &ch) in bytes.iter().enumerate() {
            if ch == b'?' {
                if i < n / 2 {
                    k += 1;
                } else {
                    k -= 1;
                }
            } else {
                let d = (ch - b'0') as i64;
                if i < n / 2 {
                    diff += d;
                } else {
                    diff -= d;
                }
            }
        }
        2 * diff + 9 * k != 0
    }
}
