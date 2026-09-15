impl Solution {
    pub fn max_xor_subsequences(nums: Vec<i32>) -> i32 {
        // A subsequence's XOR only depends on which positions it picks,
        // and XOR-ing two achievable values is again achievable, while any
        // achievable z arises as z ^ 0: the answer is the largest XOR any
        // subset can form, the classic linear-basis maximum.
        let mut basis = vec![0i32; 30]; // basis[b] leads with bit b
        for &v in &nums {
            let mut cur = v;
            while cur != 0 {
                let b = (31 - cur.leading_zeros()) as usize;
                if basis[b] != 0 {
                    cur ^= basis[b]; // dependent: strip the leading bit
                } else {
                    basis[b] = cur; // free leading bit: store and stop
                    break;
                }
            }
        }
        // Greedy fold, highest pivot first: take a vector iff it grows the
        // answer. An all-zero input leaves the basis empty at 0.
        let mut ans = 0i32;
        for b in (0..30).rev() {
            if basis[b] != 0 {
                let cand = ans ^ basis[b];
                if cand > ans {
                    ans = cand;
                }
            }
        }
        ans
    }
}
