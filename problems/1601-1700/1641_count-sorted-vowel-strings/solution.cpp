class Solution {
  public:
    int countVowelStrings(int n) {
        array<int, 5> dp = {1, 1, 1, 1, 1};
        for (int step = 0; step < n - 1; step++) {
            array<int, 5> next{};
            int prefix = 0;
            for (int v = 0; v < 5; v++) {
                prefix += dp[v];
                next[v] = prefix;
            }
            dp = next;
        }
        int total = 0;
        for (int v : dp) {
            total += v;
        }
        return total;
    }
};
