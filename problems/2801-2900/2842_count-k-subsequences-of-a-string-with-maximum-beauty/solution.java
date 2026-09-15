class Solution {

    public int countKSubsequencesWithMaxBeauty(String s, int k) {
        final int MOD = 1000000007;
        // f(c) per letter; letters absent from s drop out of the pool.
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }
        // In-place insertion sort of the (at most 26) nonzero frequencies,
        // descending - no boxing needed for a comparator sort.
        int[] counts = new int[26];
        int n = 0;
        for (int f : freq) {
            if (f > 0) {
                int p = n++;
                while (p > 0 && counts[p - 1] < f) {
                    counts[p] = counts[p - 1];
                    p--;
                }
                counts[p] = f;
            }
        }
        // Fewer than k distinct characters: no k-subsequence exists at all.
        if (k > n) {
            return 0;
        }

        long ans = 1;
        int rem = k;
        int i = 0;
        while (rem > 0) {
            int j = i;
            while (j < n && counts[j] == counts[i]) {
                j++;
            }
            int take = Math.min(rem, j - i);
            ans = (ans * comb(j - i, take)) % MOD;
            ans = (ans * powMod(counts[i], take, MOD)) % MOD;
            rem -= take;
            i = j;
        }
        return (int) ans;
    }

    // Exact: groups hold at most the 26 letters, so n <= 26 and the running
    // value never exceeds C(26, 13) = 10400600.
    private long comb(int n, int r) {
        r = Math.min(r, n - r);
        long out = 1;
        for (int t = 1; t <= r; t++) {
            out = (out * (n - r + t)) / t;
        }
        return out;
    }

    private long powMod(long x, int e, int mod) {
        long out = 1;
        while (e > 0) {
            if ((e & 1) == 1) {
                out = (out * x) % mod;
            }
            x = (x * x) % mod;
            e >>= 1;
        }
        return out;
    }
}
