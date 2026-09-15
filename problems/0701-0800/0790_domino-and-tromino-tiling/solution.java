class Solution {

    public int numTilings(int n) {
        final int MOD = 1_000_000_007;
        if (n == 1) return 1;
        if (n == 2) return 2;
        long a = 1,
            b = 1,
            c = 2; // f(0), f(1), f(2)
        for (int i = 3; i <= n; i++) {
            long next = (2 * c + a) % MOD;
            a = b;
            b = c;
            c = next;
        }
        return (int) c;
    }
}
