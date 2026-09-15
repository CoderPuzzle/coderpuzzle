impl Solution {
    pub fn max_product(s: String) -> i64 {
        let s = s.as_bytes();
        let n = s.len();

        // Manacher (odd palindromes): d1[i] = number of odd palindromes centered at i
        let mut d1 = vec![0usize; n];
        let mut left = 0isize;
        let mut right = -1isize;
        for i in 0..n {
            let i = i as isize;
            let mut k: isize = 1;
            if i <= right {
                let mirror = d1[(left + right - i) as usize];
                let span = right - i + 1;
                k = if mirror < span as usize { mirror as isize } else { span };
            }
            while i - k >= 0 && i + k < n as isize && s[(i - k) as usize] == s[(i + k) as usize] {
                k += 1;
            }
            d1[i as usize] = k as usize;
            if i + k - 1 > right {
                left = i - k + 1;
                right = i + k - 1;
            }
        }

        // Record, per center, the longest odd palindrome that ends exactly
        // at each index and the longest that starts exactly at each index.
        let mut best_end = vec![0i64; n];
        let mut best_start = vec![0i64; n];
        for c in 0..n {
            let length = 2 * d1[c] as i64 - 1;
            let end = c + d1[c] - 1;
            let start = c + 1 - d1[c]; // c - (d1[c] - 1)
            if length > best_end[end] {
                best_end[end] = length;
            }
            if length > best_start[start] {
                best_start[start] = length;
            }
        }

        // Shrink from the recorded maximum: a palindrome ending at i+1 of length L
        // implies one ending at i of length L-2 (drop one char from each side).
        for i in (0..n.saturating_sub(1)).rev() {
            let cand_end = best_end[i + 1] - 2;
            if cand_end > best_end[i] {
                best_end[i] = cand_end;
            }
        }
        for i in 1..n {
            let cand_start = best_start[i - 1] - 2;
            if cand_start > best_start[i] {
                best_start[i] = cand_start;
            }
        }

        // Prefix max of best_end / suffix max of best_start = the longest
        // palindrome fully inside each prefix / suffix.
        let mut pref = vec![0i64; n];
        pref[0] = best_end[0];
        for i in 1..n {
            pref[i] = pref[i - 1].max(best_end[i]);
        }

        let mut suff = vec![0i64; n];
        suff[n - 1] = best_start[n - 1];
        for i in (0..n - 1).rev() {
            suff[i] = suff[i + 1].max(best_start[i]);
        }

        // The two palindromes are disjoint, so some split separates them;
        // try every split. Single characters are length-1 palindromes, so
        // both sides always contribute at least 1.
        let mut ans = 0i64;
        for i in 0..n - 1 {
            let candidate = pref[i] * suff[i + 1];
            if candidate > ans {
                ans = candidate;
            }
        }
        ans
    }
}
