impl Solution {
    pub fn num_of_subsequences(s: String) -> i64 {
        // Forward pass fills preL[i] / preLC[i] (L's and LC pairs strictly
        // before boundary i) and accumulates base, the LCT count of s. The
        // backward pass fills sufT[i] / sufCT[i] (T's and CT pairs at or
        // after boundary i). Inserting letter x at boundary i gains
        // sufCT[i] for L, preL[i] * sufT[i] for C, and preLC[i] for T, so
        // the answer is base plus the best gain over the n + 1 boundaries.
        // Totals peak near ((n+1)/3)^3 ≈ 3.8e13, so i64 math is required.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut pre_l = vec![0i64; n + 1];
        let mut pre_lc = vec![0i64; n + 1];
        let mut base = 0i64;
        let mut cnt_l = 0i64;
        let mut cnt_lc = 0i64;
        for i in 0..n {
            pre_l[i] = cnt_l;
            pre_lc[i] = cnt_lc;
            match bytes[i] {
                b'L' => cnt_l += 1,
                b'C' => cnt_lc += cnt_l,
                b'T' => base += cnt_lc,
                _ => {}
            }
        }
        pre_l[n] = cnt_l;
        pre_lc[n] = cnt_lc;
        let mut suf_t = vec![0i64; n + 1];
        let mut suf_ct = vec![0i64; n + 1];
        let mut cnt_t = 0i64;
        let mut cnt_ct = 0i64;
        for i in (0..n).rev() {
            suf_t[i + 1] = cnt_t;
            suf_ct[i + 1] = cnt_ct;
            match bytes[i] {
                b'T' => cnt_t += 1,
                b'C' => cnt_ct += cnt_t,
                _ => {}
            }
        }
        suf_t[0] = cnt_t;
        suf_ct[0] = cnt_ct;
        let mut gain = 0i64;
        for i in 0..=n {
            gain = gain.max(suf_ct[i]);
            gain = gain.max(pre_l[i] * suf_t[i]);
            gain = gain.max(pre_lc[i]);
        }
        base + gain
    }
}
