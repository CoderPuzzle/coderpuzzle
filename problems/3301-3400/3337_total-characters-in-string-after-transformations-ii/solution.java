class Solution {

    private static final long MOD = 1_000_000_007L;

    private static long[][] matMul(long[][] a, long[][] b) {
        int size = a.length;
        long[][] c = new long[size][size];
        for (int i = 0; i < size; i++) {
            for (int k = 0; k < size; k++) {
                long aik = a[i][k];
                if (aik == 0) continue;
                long[] rowB = b[k];
                long[] rowC = c[i];
                for (int j = 0; j < size; j++) {
                    rowC[j] = (rowC[j] + aik * rowB[j]) % MOD;
                }
            }
        }
        return c;
    }

    private static long[][] matPow(long[][] base, long exp) {
        int size = base.length;
        long[][] result = new long[size][size];
        for (int i = 0; i < size; i++) {
            result[i][i] = 1;
        }
        while (exp > 0) {
            if ((exp & 1) != 0) {
                result = matMul(result, base);
            }
            base = matMul(base, base);
            exp >>= 1;
        }
        return result;
    }

    public int lengthAfterTransformations(String s, int t, int[] nums) {
        long[] v = new long[26];
        for (int i = 0; i < s.length(); i++) {
            v[s.charAt(i) - 'a'] += 1;
        }

        // transition[i][j] = 1 if character j produces character i.
        long[][] transition = new long[26][26];
        for (int j = 0; j < 26; j++) {
            for (int a = 1; a <= nums[j]; a++) {
                transition[(j + a) % 26][j] = 1;
            }
        }

        long[][] powered = matPow(transition, t);
        long total = 0;
        for (int i = 0; i < 26; i++) {
            long si = 0;
            for (int j = 0; j < 26; j++) {
                si = (si + powered[i][j] * v[j]) % MOD;
            }
            total = (total + si) % MOD;
        }
        return (int) total;
    }
}
