impl Solution {
    pub fn valid_substring_count(word1: String, word2: String) -> i64 {
        // A window is valid exactly when its counts cover word2's counts.
        // Track how many required characters are still `missing`; when it
        // hits zero every extension r' >= r of the current right end works,
        // contributing n - r windows for this left end. The minimal right
        // end never decreases as l advances, so each character enters and
        // leaves the window once — linear overall. The answer reaches
        // ~n^2/2 = 5e11, so it is accumulated in an i64.
        let bytes1 = word1.as_bytes();
        let bytes2 = word2.as_bytes();
        let n = bytes1.len();
        let mut need = [0i32; 26];
        for &b in bytes2 {
            need[(b - b'a') as usize] += 1;
        }
        let mut missing: i32 = need.iter().sum();
        let mut have = [0i32; 26];
        let mut total: i64 = 0;
        let mut r = 0usize;
        for l in 0..n {
            // Grow the window until it first covers word2.
            while r < n && missing > 0 {
                let c = (bytes1[r] - b'a') as usize;
                have[c] += 1;
                if need[c] > 0 && have[c] <= need[c] {
                    missing -= 1;
                }
                r += 1;
            }
            if missing > 0 {
                // No window starting at l (or any later l) can cover word2.
                break;
            }
            total += (n - (r - 1)) as i64;
            // Drop word1[l] before moving to the next left end.
            let c = (bytes1[l] - b'a') as usize;
            have[c] -= 1;
            if need[c] > 0 && have[c] < need[c] {
                missing += 1;
            }
        }
        total
    }
}
