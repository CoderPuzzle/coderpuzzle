class Solution {

    public int countOrders(int n) {
        final long MOD = 1_000_000_007L;
        long result = 1;
        // f(i) = f(i-1) * i * (2i-1): the 2(i-1) placed services leave
        // 2i-1 gaps; pickup picks one, delivery lands to its right (1+2+...+(2i-1))
        for (int i = 2; i <= n; i++) {
            result = (((result * (2L * i - 1)) % MOD) * i) % MOD;
        }
        return (int) result;
    }
}
