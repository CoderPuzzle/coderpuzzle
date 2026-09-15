class Solution {

    public int[] findProductsOfElements(long[][] queries) {
        int q = queries.length;
        int[] result = new int[q];
        for (int i = 0; i < q; i++) {
            long exp = exponentSum(queries[i][1] + 1) - exponentSum(queries[i][0]);
            result[i] = (int) powmod(2L, exp, queries[i][2]);
        }
        return result;
    }

    // count of integers in [1, M] with bit b set
    private long countBit(long M, int b) {
        if (M <= 0) {
            return 0;
        }
        long cycle = 1L << (b + 1);
        long half = 1L << b;
        long full = (M + 1) / cycle;
        long rem = (M + 1) % cycle;
        long extra = rem - half;
        return full * half + Math.max(0L, extra);
    }

    private long popcountPrefix(long M) {
        long total = 0;
        int b = 0;
        while (1L << b <= M) {
            total += countBit(M, b);
            b += 1;
        }
        return total;
    }

    private long bitsumPrefix(long M) {
        long total = 0;
        int b = 0;
        while (1L << b <= M) {
            total += (long) b * countBit(M, b);
            b += 1;
        }
        return total;
    }

    // sum of exponents of the first n elements of big_nums (n >= 0)
    private long exponentSum(long n) {
        if (n <= 0) {
            return 0;
        }
        long lo = 0;
        long hi = n;
        while (lo < hi) {
            long mid = (lo + hi + 1) / 2;
            if (popcountPrefix(mid) <= n) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        long m = lo;
        long total = bitsumPrefix(m);
        long rem = n - popcountPrefix(m);
        if (rem > 0) {
            long x = m + 1;
            int b = 0;
            while (rem > 0) {
                if (((x >> b) & 1L) == 1L) {
                    total += b;
                    rem -= 1;
                }
                b += 1;
            }
        }
        return total;
    }

    private long powmod(long base, long exp, long mod) {
        base %= mod;
        long acc = 1 % mod;
        while (exp > 0) {
            if ((exp & 1L) == 1L) {
                acc = (acc * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return acc;
    }
}
