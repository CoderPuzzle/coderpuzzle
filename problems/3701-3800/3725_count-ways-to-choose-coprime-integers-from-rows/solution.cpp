class Solution {
  public:
    int countCoprime(vector<vector<int>> &mat) {
        // f[d] counts selections whose picks are ALL divisible by d; rows
        // constrain picks independently, so it factors into a product of
        // per-row multiple-counts. Mobius inversion turns those f(d) into
        // the exact gcd-1 count: answer = sum(mu(d) * f(d)).
        int top = 0;
        for (const vector<int> &row : mat) {
            for (int v : row)
                top = max(top, v);
        }
        // mu[j] via the identity "sum of mu over the divisors of j is 1
        // exactly for j == 1": seed mu[1] and subtract down the multiples.
        vector<int> mu(top + 1, 0);
        mu[1] = 1;
        for (int i = 1; i <= top; ++i) {
            for (int j = 2 * i; j <= top; j += i) {
                mu[j] -= mu[i];
            }
        }
        // Reduced factors keep f[d] below the modulus, so f[d] * count and
        // the final signed total stay inside int64 range; the % can land
        // negative, hence the renormalization on the way out.
        const int64_t MOD = 1'000'000'007;
        vector<int64_t> f(top + 1, 1);
        vector<int> freq(top + 1, 0);
        for (const vector<int> &row : mat) {
            for (int v : row)
                ++freq[v];
            for (int d = 1; d <= top; ++d) {
                int count = 0;
                for (int multiple = d; multiple <= top; multiple += d) {
                    count += freq[multiple];
                }
                f[d] = f[d] * count % MOD;
            }
            for (int v : row)
                --freq[v];
        }
        int64_t answer = 0;
        for (int d = 0; d <= top; ++d) {
            answer += static_cast<int64_t>(mu[d]) * f[d];
        }
        return static_cast<int>((answer % MOD + MOD) % MOD);
    }
};
