impl Solution {
    pub fn max_gcd_score(nums: Vec<i32>, k: i32) -> i64 {
        // Only the 2-adic tier t = v2(value) and the odd part of each
        // element matter: doubling bumps one element's tier by 1 and never
        // touches odd parts, so a window's gcd is 2^M * g where
        // g = gcd of odd parts and M is the promoted minimum tier.
        let n = nums.len();
        let odd: Vec<i64> = nums.iter().map(|v| (v / (v & -v)) as i64).collect();
        let tier: Vec<usize> = nums.iter().map(|v| (v & -v).trailing_zeros() as usize).collect();
        let mut p2 = [1i64; 34];
        for i in 1..34 {
            p2[i] = p2[i - 1] * 2;
        }
        let mut best = 0i64;
        for l in 0..n {
            let mut g = 0i64;
            let mut cnt = [0usize; 32];
            let mut m = 32usize;
            for r in l..n {
                g = Self::gcd_of(g, odd[r]);
                let t = tier[r];
                cnt[t] += 1;
                if t < m {
                    m = t;
                }
                // Each element doubles at most once, so every element sits
                // at tier t or t+1: raising the minimum past m would need
                // the tier-m elements promoted twice — impossible. M is
                // m + 1 only when the budget covers every tier-m element.
                let big_m = if cnt[m] <= k as usize { m + 1 } else { m };
                best = best.max((r - l + 1) as i64 * p2[big_m] * g);
                // Windows further right from l: len <= n - l, g only
                // drops, M <= m + 1; stop once that bound can't beat best.
                if p2[m + 1] * g * (n - l) as i64 <= best {
                    break;
                }
            }
        }
        best
    }

    fn gcd_of(a: i64, b: i64) -> i64 {
        let (mut a, mut b) = (a, b);
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        a
    }
}
