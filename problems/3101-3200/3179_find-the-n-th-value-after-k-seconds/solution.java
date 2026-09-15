import java.util.Arrays;

class Solution {

    public int valueAfterKSeconds(int n, int k) {
        // Each second turns the array into its own prefix sums, so the
        // update is one in-place running sum repeated k times. Stored
        // values are always reduced below 10^9 + 7, and a sum of two
        // such residues stays below 2^31, so int arithmetic never
        // overflows. After k seconds the last column has counted
        // lattice paths, giving the binomial C(n - 1 + k, k).
        final int MOD = 1000000007;
        int[] a = new int[n];
        Arrays.fill(a, 1);
        for (int t = 0; t < k; ++t) {
            for (int j = 1; j < n; ++j) {
                a[j] = (a[j] + a[j - 1]) % MOD;
            }
        }
        return a[n - 1];
    }
}
