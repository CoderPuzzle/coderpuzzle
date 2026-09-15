impl Solution {
    // One pass tracks the current run; each character's best run is
    // folded in on change and once more after the loop. A digit that
    // never appears keeps its best at 0, per the statement's rule.
    pub fn check_zero_ones(s: String) -> bool {
        let mut best = [0i32; 2];
        let mut prev = b' ';
        let mut cur = 0;
        for ch in s.bytes().chain(std::iter::once(b' ')) {
            if ch == prev {
                cur += 1;
            } else {
                if prev == b'0' || prev == b'1' {
                    let slot = &mut best[(prev - b'0') as usize];
                    if cur > *slot {
                        *slot = cur;
                    }
                }
                cur = 1;
                prev = ch;
            }
        }
        best[1] > best[0]
    }
}
