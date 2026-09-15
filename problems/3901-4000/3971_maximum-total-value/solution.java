class Solution {

    public int maxTotalValue(int[] value, int[] decay, long m) {
        long M = 1000000007,
            inv = 500000004;
        java.util.function.LongUnaryOperator count = g -> {
            long z = 0;
            for (int i = 0; i < value.length; i++) if (value[i] >= g) {
                z += (value[i] - g) / decay[i] + 1;
                if (z > m) return m + 1;
            }
            return z;
        };
        java.util.function.LongUnaryOperator total = g -> {
            long z = 0;
            for (int i = 0; i < value.length; i++) if (value[i] >= g) {
                long c = (value[i] - g) / decay[i] + 1;
                z =
                    (z + (((c % M) * value[i]) % M) - (((((decay[i] % M) * (c % M)) % M) * ((c - 1) % M)) % M) * inv) %
                    M;
            }
            return (z + M) % M;
        };
        if (count.applyAsLong(1) <= m) return (int) total.applyAsLong(1);
        long l = 1,
            r = 0;
        for (int x : value) r = Math.max(r, x);
        while (l < r) {
            long x = (l + r + 1) / 2;
            if (count.applyAsLong(x) >= m) l = x;
            else r = x - 1;
        }
        long c = count.applyAsLong(l + 1);
        return (int) ((total.applyAsLong(l + 1) + ((m - c) % M) * (l % M)) % M);
    }
}
