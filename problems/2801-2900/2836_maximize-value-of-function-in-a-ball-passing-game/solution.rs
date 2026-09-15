impl Solution {
    pub fn get_max_function_value(receiver: Vec<i32>, k: i64) -> i64 {
        let n = receiver.len();
        let log = usize::BITS - (k as u64).leading_zeros(); // bit length of k (k >= 1)
        let log = log as usize;
        let mut up: Vec<Vec<usize>> = vec![vec![0usize; n]; log];
        let mut sm: Vec<Vec<i64>> = vec![vec![0i64; n]; log];
        for x in 0..n {
            up[0][x] = receiver[x] as usize;
            sm[0][x] = receiver[x] as i64;
        }
        // Binary lifting: up[j][x] is the holder after 2^j passes from x,
        // sm[j][x] the sum of receivers during them. Each level composes two
        // half-jumps; the sum adds sm at x plus sm at the midpoint because
        // the second jump's receivers start where the first lands.
        for j in 1..log {
            for x in 0..n {
                let mid = up[j - 1][x];
                up[j][x] = up[j - 1][mid];
                sm[j][x] = sm[j - 1][x] + sm[j - 1][mid];
            }
        }
        let mut best: i64 = 0;
        for x in 0..n {
            // x itself counts in the score but appears in no receiving sum.
            // Decompose k into set bits: each set bit b contributes sm[b][cur]
            // and teleports cur, simulating k <= 1e10 passes in log k steps.
            let mut total: i64 = x as i64;
            let mut cur = x;
            let mut remaining = k as u64;
            let mut bit = 0usize;
            while remaining > 0 {
                if remaining & 1 == 1 {
                    total += sm[bit][cur];
                    cur = up[bit][cur];
                }
                remaining >>= 1;
                bit += 1;
            }
            if total > best {
                best = total;
            }
        }
        best
    }
}
