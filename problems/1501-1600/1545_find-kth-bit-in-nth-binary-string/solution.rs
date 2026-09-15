impl Solution {
    pub fn find_kth_bit(n: i32, k: i32) -> String {
        // Peel levels off from n down to 1 instead of building S(n). At each
        // level, k either falls in the S(n-1) copy unchanged, lands exactly
        // on the inserted "1", or falls in the inverted mirror of S(n-1) —
        // in which case it maps back to a position in S(n-1) and the final
        // answer needs one more inversion.
        let mut n = n;
        let mut k = k;
        let mut invert = false;
        while n > 1 {
            let half = 1 << (n - 1); // len(S(n-1)), and S(n)'s middle position
            if k == half {
                return if invert { "0" } else { "1" }.to_string();
            }
            if k > half {
                k = 2 * half - k;
                invert = !invert;
            }
            n -= 1;
        }
        if invert { "1" } else { "0" }.to_string()
    }
}
