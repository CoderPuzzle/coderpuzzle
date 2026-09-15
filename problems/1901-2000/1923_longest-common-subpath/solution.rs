use std::collections::HashSet;

impl Solution {
    pub fn longest_common_subpath(n: i32, paths: Vec<Vec<i32>>) -> i32 {
        let _ = n;
        // Two independent moduli combined into one key make an accidental
        // collision astronomically unlikely.
        const MOD1: i64 = 1_000_000_007;
        const MOD2: i64 = 1_000_000_009;
        const BASE: i64 = 1000003;

        fn exists(length: usize, paths: &[Vec<i32>], mod1: i64, mod2: i64, base: i64) -> bool {
            let mut common: Option<HashSet<i64>> = None;
            for path in paths {
                if path.len() < length {
                    return false;
                }
                let mut h1: i64 = 0;
                let mut h2: i64 = 0;
                let mut power1: i64 = 1;
                let mut power2: i64 = 1;
                // +1 per city id so a run of city 0 never hashes to the all-zero value.
                for i in 0..length {
                    h1 = (h1 * base + path[i] as i64 + 1) % mod1;
                    h2 = (h2 * base + path[i] as i64 + 1) % mod2;
                    power1 = power1 * base % mod1;
                    power2 = power2 * base % mod2;
                }
                let mut hashes: HashSet<i64> = HashSet::new();
                hashes.insert(h1 * mod2 + h2);
                // Roll the window: multiply by base, drop the outgoing digit
                // weighted by BASE^L, add the incoming digit (constant per step).
                for i in length..path.len() {
                    let out1 = (path[i - length] as i64 + 1) * power1 % mod1;
                    let out2 = (path[i - length] as i64 + 1) * power2 % mod2;
                    h1 = ((h1 * base - out1) % mod1 + mod1) % mod1;
                    h2 = ((h2 * base - out2) % mod2 + mod2) % mod2;
                    h1 = (h1 + path[i] as i64 + 1) % mod1;
                    h2 = (h2 + path[i] as i64 + 1) % mod2;
                    hashes.insert(h1 * mod2 + h2);
                }
                // The first path seeds the set; each later path intersects into
                // it, bailing out the moment the intersection empties.
                match common {
                    None => common = Some(hashes),
                    Some(ref c) => {
                        let next: HashSet<i64> = c.intersection(&hashes).copied().collect();
                        if next.is_empty() {
                            return false;
                        }
                        common = Some(next);
                    }
                }
            }
            common.map_or(false, |c| !c.is_empty())
        }

        let mut hi = i64::MAX as usize;
        for p in &paths {
            hi = hi.min(p.len());
        }
        let mut lo = 0usize;
        // Existence is monotone in L (any prefix of a common subpath is common),
        // so upper-mid binary search converges on the maximum feasible length.
        while lo < hi {
            let mid = (lo + hi + 1) / 2;
            if exists(mid, &paths, MOD1, MOD2, BASE) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
