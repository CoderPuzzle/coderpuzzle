impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        // last[c] holds the most recent index of character c; -1 means never
        // seen, which folds the membership check into the guard below.
        let mut last = [-1i32; 128];
        let mut start = 0i32;
        let mut best = 0i32;
        for (i, &b) in s.as_bytes().iter().enumerate() {
            let idx = (b as usize) & 127;
            // The >= start guard ignores occurrences left of the window;
            // without it start could be dragged backwards.
            if last[idx] >= start {
                // The window can no longer include that older occurrence, so
                // start leaps over the conflict instead of shrinking by one.
                start = last[idx] + 1;
            }
            last[idx] = i as i32;
            // Window is duplicate-free again: record its length.
            best = best.max(i as i32 - start + 1);
        }
        best
    }
}
