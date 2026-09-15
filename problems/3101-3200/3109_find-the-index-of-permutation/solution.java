class Solution {

    public int getPermutationIndex(int[] perm) {
        final long MOD = 1_000_000_007L;
        int n = perm.length;
        // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        long[] fact = new long[n];
        fact[0] = 1;
        for (int i = 1; i < n; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }

        long[] tree = new long[n + 1];

        // Fenwick tree over values 1..n tracks which values are still unused
        for (int v = 1; v <= n; v++) {
            for (int i = v; i <= n; i += i & -i) {
                tree[i] += 1;
            }
        }

        long ans = 0;
        for (int i = 0; i < n; i++) {
            int x = perm[i];
            // Lehmer digit: how many unused values are smaller than perm[i]
            long smaller = 0;
            for (int j = x - 1; j > 0; j -= j & -j) {
                smaller += tree[j];
            }
            // each such value placed here leads (n - 1 - i)! earlier permutations
            ans = (ans + (smaller % MOD) * fact[n - 1 - i]) % MOD;
            // perm[i] is spent; later positions see only the remaining values
            for (int j = x; j <= n; j += j & -j) {
                tree[j] -= 1;
            }
        }
        return (int) ans;
    }
}
