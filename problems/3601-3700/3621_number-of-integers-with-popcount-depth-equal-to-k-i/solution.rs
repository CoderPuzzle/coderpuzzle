impl Solution {
    pub fn popcount_depth(n: i64, k: i32) -> i64 {
        // depth[j] = popcount-depth of the value j itself: 1 has depth 0,
        // deeper values sit one step past their own popcount.
        let mut depth = [0i32; 64];
        for j in 2..64 {
            depth[j] = depth[j.count_ones() as usize] + 1;
        }
        // Digit DP over the binary digits of n: free[x] counts prefixes
        // already strictly below n's prefix that carry x set bits, while
        // tight_ones follows n's exact prefix. Answers reach ~5e14, past
        // the i32 range.
        let mut free = [0i64; 64];
        let mut tight_ones = 0usize;
        let bit_len = (64 - n.leading_zeros()) as usize;
        for i in (0..bit_len).rev() {
            let mut nxt = free;
            for x in 0..64 {
                if free[x] != 0 {
                    nxt[x + 1] += free[x];
                }
            }
            if (n >> i) & 1 == 1 {
                // Place 0 under n's 1: that branch goes loose, free to
                // take any suffix of the remaining bits.
                nxt[tight_ones] += 1;
                tight_ones += 1;
            }
            free = nxt;
        }
        // counts[x] = integers in [1, n] with x set bits (0 included).
        let mut counts = free;
        counts[tight_ones] += 1;
        counts[0] -= 1; // the all-zero string is not a positive integer
        counts[1] -= 1; // x = 1 itself has depth 0, not depth 1
        let mut answer = if k == 0 { 1 } else { 0 };
        for j in 1..64 {
            if depth[j] == k - 1 {
                answer += counts[j];
            }
        }
        answer
    }
}
