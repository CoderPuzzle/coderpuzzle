class Solution {
  public:
    int countPalindromes(string s) {
        // A length-5 palindrome has the shape a b c b a. Iterate over each
        // position as the center c: the "ab" pair must sit strictly before
        // it and the "ba" pair strictly after. A suffix table answers the
        // right side for every center in 100 lookups; the left side grows
        // on the fly during the same left-to-right sweep.
        const int MOD = 1000000007;
        int n = s.size();
        vector<int> digits(n);
        for (int i = 0; i < n; ++i)
            digits[i] = s[i] - '0';

        // suff[i][a][b] = number of "ab" subsequences in s[i:]
        vector<vector<array<int, 10>>> suff(n + 1, vector<array<int, 10>>(10));
        vector<int> cnt(10); // digit counts in the current suffix s[i:]
        for (int i = n - 1; i >= 0; --i) {
            int d = digits[i];
            for (int a = 0; a < 10; ++a)
                suff[i][a] = suff[i + 1][a];
            for (int b = 0; b < 10; ++b) {
                suff[i][d][b] += cnt[b]; // pairs (i, j) whose first char is s[i]
            }
            cnt[d] += 1;
        }

        // left[a][b] = number of "ab" subsequences in s[:k]
        vector<array<int, 10>> left(10);
        vector<int> lcnt(10); // digit counts in s[:k]
        long long ans = 0;
        for (int k = 0; k < n; ++k) {
            int d = digits[k];
            for (int a = 0; a < 10; ++a) {
                for (int b = 0; b < 10; ++b) {
                    ans = (ans + 1LL * left[a][b] * suff[k + 1][b][a]) % MOD;
                }
            }
            for (int a = 0; a < 10; ++a) {
                left[a][d] += lcnt[a]; // pairs (p, k) whose second char is s[k]
            }
            lcnt[d] += 1;
        }
        return (int)ans;
    }
};
