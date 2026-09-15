impl Solution {
    pub fn max_a(n: i32) -> i32 {
        // best[i]: the most 'A's i presses can leave on screen. Press i is
        // either one more printed A, or the last paste after a Ctrl-A /
        // Ctrl-C pair taken at press j: the pair captures best[j] and the
        // pastes multiply it, giving the candidate best[j] * (i - j - 1).
        // j runs only to i - 3, since a pair must leave room for one paste.
        let n = n as usize;
        let mut best = vec![0i32; n + 1];
        for i in 1..=n {
            best[i] = best[i - 1] + 1;
            for j in 1..i.saturating_sub(2) {
                // i - j - 1 copies in all: the one already on screen plus
                // one for every paste.
                let copies = (i - j - 1) as i32;
                best[i] = best[i].max(best[j] * copies);
            }
        }
        best[n]
    }
}
