impl Solution {
    pub fn h_index(citations: Vec<i32>) -> i32 {
        let n = citations.len();
        // h can never exceed the paper count, so citations above n are as
        // good as n: tally into n+1 buckets with oversized values clamped.
        let mut count = vec![0usize; n + 1];
        for &c in &citations {
            let idx = (c as usize).min(n);
            count[idx] += 1;
        }
        // Walk h from the top; after adding bucket h, total is the number of
        // papers with at least h citations (larger counts were clamped into
        // higher-or-equal buckets and are already included).
        let mut total = 0usize;
        for h in (0..=n).rev() {
            total += count[h];
            // First h with "at least h papers cited >= h" is maximal: every
            // larger h was tested first and failed this same test.
            if total >= h {
                return h as i32;
            }
        }
        // Unreachable: at h = 0 the accumulated total is n >= 0.
        0
    }
}
