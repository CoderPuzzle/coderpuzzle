class Solution {
  public:
    int minOperations(string word1, string word2) {
        // Per part, an index may serve at most one swap, one replace and
        // one reversal, so an optimal schedule permutes first (at most one
        // reversal plus disjoint swaps) and replaces what is left. A swap
        // pays off exactly on a mutual pair (a,b)/(b,a); with type counts
        // cnt[a][b] = #{p: s[p]=a != t[p]=b}, the largest swap matching is
        // sum min(cnt[a][b], cnt[b][a]), and the part costs wrong - pairs,
        // or 1 + wrong' - pairs' when reversed first.
        int n = word1.size();
        vector<vector<int>> cost(n, vector<int>(n, 0));
        auto swapPairs = [](int cnt[26][26]) {
            int total = 0;
            for (int a = 0; a < 26; ++a)
                for (int b = a + 1; b < 26; ++b)
                    total += min(cnt[a][b], cnt[b][a]);
            return total;
        };
        for (int i = 0; i < n; ++i) {
            for (int j = i; j < n; ++j) {
                int cnt[26][26] = {};
                int cntRev[26][26] = {};
                int wrong = 0, wrongRev = 0;
                for (int p = i; p <= j; ++p) {
                    int a = word1[p] - 'a', b = word2[p] - 'a';
                    if (a != b) {
                        ++wrong;
                        ++cnt[a][b];
                    }
                    int aRev = word1[j - (p - i)] - 'a';
                    if (aRev != b) {
                        ++wrongRev;
                        ++cntRev[aRev][b];
                    }
                }
                cost[i][j] = min(wrong - swapPairs(cnt), 1 + wrongRev - swapPairs(cntRev));
            }
        }
        // Partition DP over prefix lengths; costs add across parts.
        vector<int> best(n + 1, INT_MAX);
        best[0] = 0;
        for (int end = 1; end <= n; ++end)
            for (int start = 0; start < end; ++start)
                best[end] = min(best[end], best[start] + cost[start][end - 1]);
        return best[n];
    }
};
