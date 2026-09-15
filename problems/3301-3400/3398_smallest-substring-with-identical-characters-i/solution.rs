impl Solution {
    // Binary search the answer m. m == 1 needs full alternation, so the cost
    // is the smaller Hamming distance to one of the two alternating targets;
    // for m >= 2 a run of length L independently costs floor(L / (m + 1))
    // flips, all placeable strictly inside the run so runs never merge.
    pub fn min_length(s: String, num_ops: i32) -> i32 {
        let s = s.as_bytes();
        let n = s.len() as i32;
        let ok = |m: i32| -> bool {
            if m == 1 {
                let alt = (0..s.len()).filter(|&i| s[i] != b"01"[i % 2]).count() as i32;
                return alt.min(n - alt) <= num_ops;
            }
            let mut flips = 0;
            let mut run = 1;
            for i in 1..s.len() {
                if s[i] == s[i - 1] {
                    run += 1;
                } else {
                    flips += run / (m + 1);
                    run = 1;
                }
            }
            flips + run / (m + 1) <= num_ops
        };
        let (mut lo, mut hi) = (1, n);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if ok(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
