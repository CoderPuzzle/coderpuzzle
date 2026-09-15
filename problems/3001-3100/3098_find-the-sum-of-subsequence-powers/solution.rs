use std::collections::BTreeSet;

impl Solution {
    pub fn sum_of_powers(nums: Vec<i32>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut a: Vec<i64> = nums.iter().map(|&x| x as i64).collect();
        a.sort_unstable();

        let mut diff_set: BTreeSet<i64> = BTreeSet::new();
        for i in 0..n {
            for j in (i + 1)..n {
                diff_set.insert(a[j] - a[i]);
            }
        }
        let diffs: Vec<i64> = diff_set.into_iter().collect();

        let count_at_least = |d: i64| -> i64 {
            // number of length-k subsequences with all adjacent gaps >= d
            let mut splits = vec![0usize; n];
            for j in 0..n {
                let target = a[j] - d;
                let mut lo = 0usize;
                let mut hi = j;
                while lo < hi {
                    let mid = lo + (hi - lo) / 2;
                    if a[mid] <= target {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                splits[j] = lo;
            }
            let mut prev = vec![1i64; n];
            for _length in 2..=(k as usize) {
                let mut pref = vec![0i64; n + 1];
                for i in 0..n {
                    pref[i + 1] = pref[i] + prev[i];
                }
                if pref[n] == 0 {
                    return 0;
                }
                let mut cur = vec![0i64; n];
                for j in 0..n {
                    cur[j] = pref[splits[j]] % MOD;
                }
                prev = cur;
            }
            let mut total: i64 = 0;
            for v in prev {
                total += v;
            }
            total % MOD
        };

        let mut ans: i64 = 0;
        let mut prev_f: i64 = 0;
        for &d in diffs.iter().rev() {
            let f = count_at_least(d);
            let g = ((f - prev_f) % MOD + MOD) % MOD;
            ans = (ans + (d % MOD) * g % MOD) % MOD;
            prev_f = f;
        }
        ans as i32
    }
}
