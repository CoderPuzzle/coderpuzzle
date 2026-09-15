use std::collections::HashMap;

impl Solution {
    pub fn longest_dup_substring(s: String) -> String {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let a: Vec<i64> = bytes.iter().map(|&b| (b - b'a') as i64).collect();
        const MOD1: i64 = 1_000_000_007;
        const MOD2: i64 = 1_000_000_009;
        const BASE: i64 = 26;

        // Precomputed base powers so each rolling-hash slide costs O(1).
        let mut pow1 = vec![1i64; n + 1];
        let mut pow2 = vec![1i64; n + 1];
        for i in 1..=n {
            pow1[i] = pow1[i - 1] * BASE % MOD1;
            pow2[i] = pow2[i - 1] * BASE % MOD2;
        }

        // Returns a start index of some length-`length` duplicate, else None.
        let check = |length: usize| -> Option<usize> {
            if length == 0 {
                return None;
            }
            let mut h1: i64 = 0;
            let mut h2: i64 = 0;
            for i in 0..length {
                h1 = (h1 * BASE + a[i]) % MOD1;
                h2 = (h2 * BASE + a[i]) % MOD2;
            }
            let mut seen: HashMap<(i64, i64), Vec<usize>> = HashMap::new();
            seen.entry((h1, h2)).or_insert_with(Vec::new).push(0);
            for i in 1..=(n - length) {
                // Roll: drop the leftmost character's contribution, append the
                // incoming one.
                let t1 = (h1 - a[i - 1] * pow1[length - 1]).rem_euclid(MOD1);
                h1 = (t1 * BASE + a[i + length - 1]) % MOD1;
                let t2 = (h2 - a[i - 1] * pow2[length - 1]).rem_euclid(MOD2);
                h2 = (t2 * BASE + a[i + length - 1]) % MOD2;
                // Two independent polynomial hashes form the key; a repeat is
                // still verified character by character so collisions can
                // never produce a wrong answer.
                let key = (h1, h2);
                if let Some(starts) = seen.get_mut(&key) {
                    let mut matched = false;
                    for &st in starts.iter() {
                        let mut eq = true;
                        for t in 0..length {
                            if a[st + t] != a[i + t] {
                                eq = false;
                                break;
                            }
                        }
                        if eq {
                            matched = true;
                            break;
                        }
                    }
                    if matched {
                        return Some(i);
                    }
                    starts.push(i);
                } else {
                    seen.insert(key, vec![i]);
                }
            }
            None
        };

        // Monotonicity: a duplicate of length L implies duplicates at every
        // shorter length, so feasible lengths form a prefix — binary search
        // the largest one.
        let mut lo = 1usize;
        let mut hi = n;
        let mut best_length = 0usize;
        let mut best_start: Option<usize> = None;
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            match check(mid) {
                Some(idx) => {
                    best_length = mid;
                    best_start = Some(idx);
                    lo = mid + 1;
                }
                None => {
                    if mid == 0 {
                        break;
                    }
                    hi = mid - 1;
                }
            }
        }

        if best_length == 0 {
            return String::new();
        }
        s[best_start.unwrap()..best_start.unwrap() + best_length].to_string()
    }
}
