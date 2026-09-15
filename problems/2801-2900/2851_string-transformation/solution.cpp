class Solution {
  public:
    int numberOfWays(string s, string t, long long k) {
        const long long MOD = 1000000007LL;
        long long n = (long long)s.size();
        long long cnt = countRotations(s, t);
        // Aggregate rotations into two classes: cnt that spell t and n - cnt
        // that do not. From a T rotation one operation lands on cnt - 1
        // others (the identity shift is forbidden) or n - cnt non-T; from a
        // non-T it lands on cnt T or n - 1 - cnt non-T. Length-k walk counts
        // depend only on the starting class, hence this 2x2 matrix.
        long long mat[2][2] = {{mod(cnt - 1, MOD), mod(cnt, MOD)}, {mod(n - cnt, MOD), mod(n - 1 - cnt, MOD)}};
        long long mk[2][2];
        // k reaches 1e15, so exponentiate by repeated squaring: O(log k)
        // constant-size multiplications under the modulus.
        matPow(mat, k, mk, MOD);
        // Start on the class-T rotation iff s == t; the answer is the
        // class-T component (automatically 0 when cnt = 0).
        long long v0 = (s == t) ? 1 : 0;
        long long v1 = 1 - v0;
        return (int)((mk[0][0] * v0 + mk[0][1] * v1) % MOD);
    }

  private:
    long long mod(long long x, long long m) {
        long long r = x % m;
        if (r < 0)
            r += m;
        return r;
    }

    long long countRotations(const string &s, const string &t) {
        // Every operation rotates s by a nonzero shift, so s is always one
        // of its n rotations. Count those equal to t by searching t in s+s
        // truncated to 2n-1 characters (dropping the last so the
        // full-string rotation is not double counted).
        int n = (int)s.size();
        vector<int> pi(n, 0);
        for (int i = 1; i < n; i++) {
            int j = pi[i - 1];
            while (j > 0 && t[i] != t[j]) {
                j = pi[j - 1];
            }
            if (t[i] == t[j]) {
                j += 1;
            }
            pi[i] = j;
        }
        int cnt = 0;
        int j = 0;
        for (int i = 0; i < 2 * n - 1; i++) {
            char c = s[i % n];
            while (j > 0 && c != t[j]) {
                j = pi[j - 1];
            }
            if (c == t[j]) {
                j += 1;
            }
            if (j == n) {
                cnt += 1;
                j = pi[j - 1];
            }
        }
        return cnt;
    }

    void matMul(const long long a[2][2], const long long b[2][2], long long out[2][2], long long MOD) {
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                out[i][j] = (a[i][0] * b[0][j] + a[i][1] * b[1][j]) % MOD;
            }
        }
    }

    void matPow(const long long m[2][2], long long p, long long out[2][2], long long MOD) {
        long long r[2][2] = {{1, 0}, {0, 1}};
        long long tmp[2][2];
        long long base[2][2];
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                base[i][j] = m[i][j];
        while (p > 0) {
            if (p & 1) {
                matMul(r, base, tmp, MOD);
                for (int i = 0; i < 2; i++)
                    for (int j = 0; j < 2; j++)
                        r[i][j] = tmp[i][j];
            }
            matMul(base, base, tmp, MOD);
            for (int i = 0; i < 2; i++)
                for (int j = 0; j < 2; j++)
                    base[i][j] = tmp[i][j];
            p >>= 1;
        }
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                out[i][j] = r[i][j];
    }
};
