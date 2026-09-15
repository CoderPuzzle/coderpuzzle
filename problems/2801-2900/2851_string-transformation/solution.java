class Solution {

    private static final long MOD = 1000000007L;

    public int numberOfWays(String s, String t, long k) {
        long n = s.length();
        long cnt = countRotations(s, t);
        // Aggregate rotations into two classes: cnt that spell t and n - cnt
        // that do not. From a T rotation one operation lands on cnt - 1
        // others (the identity shift is forbidden) or n - cnt non-T; from a
        // non-T it lands on cnt T or n - 1 - cnt non-T. Length-k walk counts
        // depend only on the starting class, hence this 2x2 matrix.
        long[][] mat = { { mod(cnt - 1), mod(cnt) }, { mod(n - cnt), mod(n - 1 - cnt) } };
        // k reaches 1e15, so exponentiate by repeated squaring: O(log k)
        // constant-size multiplications under the modulus.
        long[][] mk = matPow(mat, k);
        // Start on the class-T rotation iff s == t; the answer is the
        // class-T component (automatically 0 when cnt = 0).
        long v0 = s.equals(t) ? 1 : 0;
        long v1 = 1 - v0;
        return (int) ((mk[0][0] * v0 + mk[0][1] * v1) % MOD);
    }

    private long mod(long x) {
        long r = x % MOD;
        if (r < 0) r += MOD;
        return r;
    }

    private long countRotations(String s, String t) {
        // Every operation rotates s by a nonzero shift, so s is always one
        // of its n rotations. Count those equal to t by searching t in s+s
        // truncated to 2n-1 characters (dropping the last so the
        // full-string rotation is not double counted).
        int n = s.length();
        int[] pi = new int[n];
        for (int i = 1; i < n; i++) {
            int j = pi[i - 1];
            while (j > 0 && t.charAt(i) != t.charAt(j)) {
                j = pi[j - 1];
            }
            if (t.charAt(i) == t.charAt(j)) {
                j += 1;
            }
            pi[i] = j;
        }
        int cnt = 0;
        int j = 0;
        for (int i = 0; i < 2 * n - 1; i++) {
            char c = s.charAt(i % n);
            while (j > 0 && c != t.charAt(j)) {
                j = pi[j - 1];
            }
            if (c == t.charAt(j)) {
                j += 1;
            }
            if (j == n) {
                cnt += 1;
                j = pi[j - 1];
            }
        }
        return cnt;
    }

    private long[][] matMul(long[][] a, long[][] b) {
        return new long[][] {
            { (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % MOD, (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % MOD },
            { (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % MOD, (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % MOD },
        };
    }

    private long[][] matPow(long[][] m, long p) {
        long[][] r = { { 1, 0 }, { 0, 1 } };
        while (p > 0) {
            if ((p & 1) == 1) {
                r = matMul(r, m);
            }
            m = matMul(m, m);
            p >>= 1;
        }
        return r;
    }
}
