impl Solution {
    pub fn max_product(s: String) -> i64 {
        let s = s.as_bytes();
        let n = s.len();

        let a: Vec<i64> = s.iter().map(|&b| (b - b'a') as i64).collect();
        const MOD1: i64 = 1_000_000_007;
        const MOD2: i64 = 1_000_000_009;
        const BASE: i64 = 26;

        // Precomputed base powers plus forward and reversed prefix hashes, so
        // any substring palindrome test costs O(1).
        let mut pow1 = vec![1i64; n + 1];
        let mut pow2 = vec![1i64; n + 1];
        let mut pre1 = vec![0i64; n + 1];
        let mut pre2 = vec![0i64; n + 1];
        let mut rpre1 = vec![0i64; n + 1];
        let mut rpre2 = vec![0i64; n + 1];
        for i in 1..=n {
            pow1[i] = pow1[i - 1] * BASE % MOD1;
            pow2[i] = pow2[i - 1] * BASE % MOD2;
            pre1[i] = (pre1[i - 1] * BASE + a[i - 1]) % MOD1;
            pre2[i] = (pre2[i - 1] * BASE + a[i - 1]) % MOD2;
            rpre1[i] = (rpre1[i - 1] * BASE + a[n - i]) % MOD1;
            rpre2[i] = (rpre2[i - 1] * BASE + a[n - i]) % MOD2;
        }

        // s[l..r] is a palindrome iff its forward hash equals the forward hash
        // of the mirrored window in the reversed string; two independent
        // moduli make a false match vanishingly unlikely.
        let is_pal = |l: usize, r: usize| -> bool {
            let length = r - l + 1;
            let f1 = (pre1[r + 1] - pre1[l] * pow1[length]).rem_euclid(MOD1);
            let g1 = (rpre1[n - l] - rpre1[n - 1 - r] * pow1[length]).rem_euclid(MOD1);
            let f2 = (pre2[r + 1] - pre2[l] * pow2[length]).rem_euclid(MOD2);
            let g2 = (rpre2[n - l] - rpre2[n - 1 - r] * pow2[length]).rem_euclid(MOD2);
            f1 == g1 && f2 == g2
        };

        // A palindrome of radius k around c implies one at every smaller
        // radius, so the predicate is monotone: binary-search each center's
        // maximal reach.
        let mut d1 = vec![0usize; n];
        for c in 0..n {
            let mut lo = 0usize;
            let mut hi = c.min(n - 1 - c);
            while lo < hi {
                let mid = (lo + hi + 1) / 2;
                if is_pal(c - mid, c + mid) {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            d1[c] = lo + 1;
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
