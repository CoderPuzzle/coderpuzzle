impl Solution {
    pub fn can_change(start: String, target: String) -> bool {
        // pieces cannot pass through each other, so their relative order is
        // invariant: the k-th non-blank of start must match the k-th of target
        let s: Vec<(usize, char)> = start.chars().enumerate().filter(|&(_, c)| c != '_').collect();
        let t: Vec<(usize, char)> = target.chars().enumerate().filter(|&(_, c)| c != '_').collect();
        // unequal piece counts can never be matched one-to-one
        if s.len() != t.len() {
            return false;
        }
        for (&(i, ci), &(j, cj)) in s.iter().zip(t.iter()) {
            // equal counts but a different L/R sequence cannot align
            if ci != cj {
                return false;
            }
            // L slides only left: it must not need to move right (i >= j);
            // R slides only right: i <= j — and these checks are also
            // sufficient, so no moves ever need simulating
            if ci == 'L' && i < j {
                return false;
            }
            if ci == 'R' && i > j {
                return false;
            }
        }
        true
    }
}
