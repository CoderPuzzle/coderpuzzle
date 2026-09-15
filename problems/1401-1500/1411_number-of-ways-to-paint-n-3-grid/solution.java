class Solution {

    public int numOfWays(int n) {
        final int MOD = 1_000_000_007;
        long a = 6,
            b = 6;
        for (int i = 1; i < n; i++) {
            long nextA = (3 * a + 2 * b) % MOD;
            long nextB = (2 * a + 2 * b) % MOD;
            a = nextA;
            b = nextB;
        }
        return (int) ((a + b) % MOD);
    }
}
