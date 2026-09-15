impl Solution {
    pub fn minimum_cost(s: String, t: String, flip_cost: i32, swap_cost: i32, cross_cost: i32) -> i64 {
        // Mismatch classes decide everything: a01 counts columns needing 0->1,
        // a10 the mirror image. Opposite kinds cancel pairwise with one swap
        // (or two flips); leftovers of a single kind pair up via cross-swap +
        // swap (or two flips); a lone leftover takes one flip.
        let bytes_s = s.as_bytes();
        let bytes_t = t.as_bytes();
        let mut a01: i64 = 0;
        let mut a10: i64 = 0;
        for i in 0..bytes_s.len() {
            if bytes_s[i] == b'0' && bytes_t[i] == b'1' {
                a01 += 1;
            } else if bytes_s[i] == b'1' && bytes_t[i] == b'0' {
                a10 += 1;
            }
        }
        // Opposite-kind mismatches fix each other: reorder one string so they
        // meet, paying one swap; two flips is the alternative.
        let pairs = a01.min(a10);
        let mut cost = pairs * (swap_cost as i64).min(2 * flip_cost as i64);
        let same = (a01 - a10).abs();
        // Same-kind mismatches: a cross-swap turns one into the other kind,
        // then a swap pairs it — or just flip both.
        cost += (same / 2) * ((cross_cost as i64) + (swap_cost as i64)).min(2 * flip_cost as i64);
        if same % 2 == 1 {
            cost += flip_cost as i64;
        }
        cost
    }
}
