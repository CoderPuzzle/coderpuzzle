impl Solution {
    pub fn get_permutation_index(perm: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = perm.len();
        // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        let mut fact = vec![1i64; n];
        for i in 1..n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }

        let mut tree = vec![0i64; n + 1];
        let add = |tree: &mut Vec<i64>, mut i: usize, delta: i64| {
            while i <= n {
                tree[i] += delta;
                i += i & i.wrapping_neg();
            }
        };
        let query = |tree: &Vec<i64>, mut i: usize| -> i64 {
            let mut s = 0i64;
            while i > 0 {
                s += tree[i];
                i -= i & i.wrapping_neg();
            }
            s
        };

        // Fenwick tree over values 1..n tracks which values are still unused
        for v in 1..=n {
            add(&mut tree, v, 1);
        }

        let mut ans: i64 = 0;
        for (i, &x) in perm.iter().enumerate() {
            let x = x as usize;
            // Lehmer digit: how many unused values are smaller than perm[i]
            let smaller = query(&tree, x - 1);
            // each such value placed here leads (n - 1 - i)! earlier permutations
            ans = (ans + smaller % MOD * fact[n - 1 - i]) % MOD;
            // perm[i] is spent; later positions see only the remaining values
            add(&mut tree, x, -1);
        }
        ans as i32
    }
}
