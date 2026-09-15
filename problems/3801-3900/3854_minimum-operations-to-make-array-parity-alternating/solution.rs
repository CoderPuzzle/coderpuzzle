impl Solution {
    // Bounds stay within ±10^9 + 1, so they fit i32, but the width can
    // reach 2 × 10^9 — accumulated in i64 for headroom and returned as i32,
    // which it provably fits.
    // An alternating array follows one of two templates (even-first or
    // odd-first), and every element fits exactly one of them at its index —
    // so one pass scores both. The template an element matches pins its
    // value; the other pays one operation and may settle at v - 1 or v + 1,
    // whose window the slack bounds v+1 / v-1 enclose.
    pub fn make_parity_alternating(nums: Vec<i32>) -> Vec<i32> {
        let mut ops = [0i64; 2];
        let mut lo = [i64::MAX; 2];
        let mut hi = [i64::MIN; 2];
        for (i, &v) in nums.iter().enumerate() {
            let matched = if (v as i64) & 1 == (i as i64) & 1 { 0 } else { 1 };
            let missed = 1 - matched;
            ops[missed] += 1;
            lo[missed] = lo[missed].min(v as i64 + 1);
            hi[missed] = hi[missed].max(v as i64 - 1);
            lo[matched] = lo[matched].min(v as i64);
            hi[matched] = hi[matched].max(v as i64);
        }
        let mut best: Option<(i64, i64)> = None;
        for t in 0..2 {
            let mut spread = hi[t] - lo[t];
            if ops[t] > 0 && spread < 1 {
                // Paying operations means n >= 2 and the final array
                // alternates, so its spread is at least 1; the slack bounds
                // alone can collapse to 0 (nums = [10, 10]).
                spread = 1;
            }
            let cand = (ops[t], spread);
            if best.is_none() || cand < best.unwrap() {
                best = Some(cand);
            }
        }
        let (ops, spread) = best.unwrap();
        vec![ops as i32, spread as i32]
    }
}
