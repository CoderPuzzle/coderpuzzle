class Solution {
  public:
    int possibleStringCount(string word, int k) {
        const long long MOD = 1000000007LL;
        // Each maximal run of length c contributes between 1 and c intended
        // characters; count tuples of total length >= k as total - (length < k).
        int n = (int)word.size();
        vector<int> runs;
        runs.reserve(n);
        for (int i = 0; i < n;) {
            int j = i;
            while (j < n && word[j] == word[i])
                j++;
            runs.push_back(j - i);
            i = j;
        }

        int r = (int)runs.size();
        long long total = 1;
        for (int c : runs) {
            total = total * c % MOD;
        }
        if (k <= r) {
            return (int)total; // every tuple already has length >= r >= k
        }

        // dp[j] = number of ways to reach total length j (< k).
        vector<long long> dp(k, 0), ndp(k, 0), prefix(k + 1, 0);
        dp[0] = 1;
        for (int c : runs) {
            long long s = 0;
            for (int j = 0; j < k; j++) {
                s = (s + dp[j]) % MOD;
                prefix[j + 1] = s;
            }
            for (int j = 1; j < k; j++) {
                int lo = max(0, j - c);
                ndp[j] = (prefix[j] - prefix[lo] + MOD) % MOD;
            }
            ndp[0] = 0;
            dp.swap(ndp);
        }

        long long bad = 0;
        for (int j = 0; j < k; j++) {
            bad = (bad + dp[j]) % MOD;
        }
        return (int)(((total - bad) % MOD + MOD) % MOD);
    }
};
