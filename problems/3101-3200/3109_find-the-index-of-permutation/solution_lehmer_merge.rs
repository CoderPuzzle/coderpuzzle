impl Solution {
    pub fn get_permutation_index(perm: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = perm.len();
        // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        let mut fact = vec![1i64; n];
        for i in 1..n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }

        // Lehmer digit re-read: the values still unused at slot i are exactly
        // the values in later slots, so digit i counts later slots holding
        // smaller values -- a per-position smaller-to-the-right inversion count.
        let mut smaller_after = vec![0i64; n];
        // merge-sort workspace of (value, original index) pairs, sorted by value
        let mut order: Vec<(i32, usize)> = perm.iter().copied().zip(0..n).collect();
        fn merge_sort(order: &mut Vec<(i32, usize)>, smaller_after: &mut Vec<i64>, lo: usize, hi: usize) {
            if hi - lo < 2 {
                return;
            }
            let mid = (lo + hi) / 2;
            merge_sort(order, smaller_after, lo, mid);
            merge_sort(order, smaller_after, mid, hi);
            let left: Vec<(i32, usize)> = order[lo..mid].to_vec();
            let (mut i, mut j, mut k) = (0, mid, lo);
            while i < left.len() && j < hi {
                if left[i].0 < order[j].0 {
                    smaller_after[left[i].1] += (j - mid) as i64; // right-half values already placed below it
                    order[k] = left[i];
                    i += 1;
                } else {
                    order[k] = order[j];
                    j += 1;
                }
                k += 1;
            }
            while i < left.len() {
                smaller_after[left[i].1] += (j - mid) as i64; // the whole right half sits below it
                order[k] = left[i];
                i += 1;
                k += 1;
            }
        }
        merge_sort(&mut order, &mut smaller_after, 0, n);

        let mut ans: i64 = 0;
        for (i, &smaller) in smaller_after.iter().enumerate() {
            // each later smaller value placed at slot i leads (n - 1 - i)! earlier permutations
            ans = (ans + smaller % MOD * fact[n - 1 - i]) % MOD;
        }
        ans as i32
    }
}
