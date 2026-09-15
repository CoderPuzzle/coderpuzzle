impl Solution {
    // Two counters bracket the value range: `lo` is the smallest value not
    // yet placed, `hi` the largest. An 'I' is safest satisfied with lo
    // (everything still unused is larger), a 'D' with hi — the pinned
    // canonical construction.
    pub fn di_string_match(s: String) -> Vec<i32> {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let (mut lo, mut hi) = (0i32, n as i32);
        let mut perm: Vec<i32> = Vec::with_capacity(n + 1);
        for &b in bytes {
            if b == b'I' {
                perm.push(lo);
                lo += 1;
            } else {
                perm.push(hi);
                hi -= 1;
            }
        }
        // lo and hi have met; the single leftover value fills the last slot.
        perm.push(lo);
        perm
    }
}
