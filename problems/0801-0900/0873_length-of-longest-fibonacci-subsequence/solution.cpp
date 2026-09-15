class Solution {
  public:
    int lenLongestFibSubseq(vector<int> &arr) {
        int n = arr.size();
        unordered_map<int, int> indexOf;
        for (int i = 0; i < n; i++) {
            indexOf[arr[i]] = i;
        }
        // dp[j][i] = longest Fibonacci-like subsequence ending with arr[j], arr[i]
        vector<vector<int>> dp(n, vector<int>(n, 2));
        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int need = arr[i] - arr[j];
                if (need < arr[j] && indexOf.count(need)) {
                    int k = indexOf[need];
                    dp[j][i] = dp[k][j] + 1;
                    best = max(best, dp[j][i]);
                }
            }
        }
        return best >= 3 ? best : 0;
    }
};
