const MOD: i64 = 1_000_000_007;

impl Solution {
    pub fn count_k_subsequences_with_max_beauty(s: String, k: i32) -> i32 {
        // f(c) per byte-letter; letters absent from s drop out of the pool.
        let mut freq = [0i64; 26];
        for b in s.as_bytes() {
            freq[(b - b'a') as usize] += 1;
        }
        let mut counts: Vec<i64> = freq.iter().filter(|f| **f > 0).copied().collect();
        counts.sort();
        counts.reverse();
        let n = counts.len();
        // Fewer than k distinct characters: no k-subsequence exists at all.
        if k as usize > n {
            return 0;
        }

        let mut ans: i64 = 1;
        let mut rem: i64 = k as i64;
        let mut i = 0usize;
        while rem > 0 {
            let mut j = i;
            while j < n && counts[j] == counts[i] {
                j += 1;
            }
            let take = std::cmp::min(rem, (j - i) as i64);
            ans = ans * Self::comb(j - i, take as usize) % MOD;
            ans = ans * Self::pow_mod(counts[i], take, MOD) % MOD;
            rem -= take;
            i = j;
        }
        ans as i32
    }

    // Exact: groups hold at most the 26 letters, so n <= 26 and the running
    // value never exceeds C(26, 13) = 10400600.
    fn comb(n: usize, r: usize) -> i64 {
        let r = r.min(n - r);
        let mut out: i64 = 1;
        for t in 1..=r {
            out = out * (n - r + t) as i64 / t as i64;
        }
        out
    }

    fn pow_mod(x: i64, e: i64, m: i64) -> i64 {
        let (mut out, mut x, mut e) = (1i64, x, e);
        while e > 0 {
            if e & 1 == 1 {
                out = out * x % m;
            }
            x = x * x % m;
            e >>= 1;
        }
        out
    }
}
