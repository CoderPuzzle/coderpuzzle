class Solution {
  public:
    vector<vector<long long>> matMul(const vector<vector<long long>> &a, const vector<vector<long long>> &b) {
        int size = (int)a.size();
        vector<vector<long long>> c(size, vector<long long>(size, 0));
        for (int i = 0; i < size; i++) {
            for (int k = 0; k < size; k++) {
                long long aik = a[i][k];
                if (aik == 0)
                    continue;
                const vector<long long> &rowB = b[k];
                vector<long long> &rowC = c[i];
                for (int j = 0; j < size; j++) {
                    rowC[j] = (rowC[j] + aik * rowB[j]) % MODLL;
                }
            }
        }
        return c;
    }

    vector<vector<long long>> matPow(vector<vector<long long>> base, long long exp) {
        int size = (int)base.size();
        vector<vector<long long>> result(size, vector<long long>(size, 0));
        for (int i = 0; i < size; i++) {
            result[i][i] = 1;
        }
        while (exp > 0) {
            if (exp & 1) {
                result = matMul(result, base);
            }
            base = matMul(base, base);
            exp >>= 1;
        }
        return result;
    }

    int lengthAfterTransformations(string s, int t, vector<int> &nums) {
        const long long MOD = 1000000007LL;
        vector<long long> v(26, 0);
        for (char ch : s) {
            v[ch - 'a'] += 1;
        }

        // transition[i][j] = 1 if character j produces character i.
        vector<vector<long long>> transition(26, vector<long long>(26, 0));
        for (int j = 0; j < 26; j++) {
            for (int a = 1; a <= nums[j]; a++) {
                transition[(j + a) % 26][j] = 1;
            }
        }

        vector<vector<long long>> powered = matPow(transition, (long long)t);
        long long total = 0;
        for (int i = 0; i < 26; i++) {
            long long si = 0;
            for (int j = 0; j < 26; j++) {
                si = (si + powered[i][j] * v[j]) % MOD;
            }
            total = (total + si) % MOD;
        }
        return (int)total;
    }

  private:
    static const long long MODLL = 1000000007LL;
};
