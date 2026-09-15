class Solution {
  public:
    int numFactoredBinaryTrees(vector<int> &arr) {
        const long long MOD = 1000000007LL;
        sort(arr.begin(), arr.end());
        unordered_map<int, int> index;
        for (int i = 0; i < (int)arr.size(); i++) {
            index[arr[i]] = i;
        }
        vector<long long> dp(arr.size(), 1); // dp[i] = trees rooted at arr[i]
        for (int i = 0; i < (int)arr.size(); i++) {
            int v = arr[i];
            long long total = 1;
            for (int j = 0; j < i; j++) {
                if (v % arr[j] == 0) {
                    auto it = index.find(v / arr[j]);
                    if (it != index.end()) {
                        total += dp[j] * dp[it->second];
                    }
                }
            }
            dp[i] = total % MOD;
        }
        long long sum = 0;
        for (long long value : dp) {
            sum += value;
        }
        return (int)(sum % MOD);
    }
};
