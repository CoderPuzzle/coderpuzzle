impl Solution {
    // The answer depends only on how often each character occurs, and the
    // alphabet is fixed — one slot per possible character, one pass.
    pub fn frequency_sort(s: String) -> String {
        let mut counts = [0usize; 128];
        for byte in s.bytes() {
            counts[byte as usize] += 1;
        }
        let mut ranked: Vec<u8> = (0..128).collect();
        // Frequency descending, ties broken by character ascending — the
        // pinned order that makes the expected output unique.
        ranked.sort_by(|&a, &b| counts[b as usize].cmp(&counts[a as usize]).then(a.cmp(&b)));
        let mut out = String::with_capacity(s.len());
        for c in ranked {
            for _ in 0..counts[c as usize] {
                out.push(c as char);
            }
        }
        out
    }
}
