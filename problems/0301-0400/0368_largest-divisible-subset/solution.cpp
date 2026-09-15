class Solution {
  public:
    vector<int> largestDivisibleSubset(vector<int> &nums) {
        // Divisibility is transitive, so in ascending order each element
        // need only be divisible by the previous one — a longest-chain DP.
        vector<int> arr(nums);
        sort(arr.begin(), arr.end());
        int n = (int)arr.size();
        if (n == 0)
            return {};
        // dp[i] = size of the largest divisible subset ending at arr[i];
        // parent links let the subset be rebuilt, not just counted.
        vector<int> dp(n, 1);
        vector<int> parent(n, -1);
        int best = 0;
        for (int i = 0; i < n; i++) {
            // Every earlier divisor offers the extension dp[j] + 1.
            for (int j = 0; j < i; j++) {
                if (arr[i] % arr[j] == 0 && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
            if (dp[i] > dp[best])
                best = i;
        }
        // Trace parent links from the largest chain, reverse to ascending.
        vector<int> result;
        for (int i = best; i != -1; i = parent[i])
            result.push_back(arr[i]);
        reverse(result.begin(), result.end());
        return result;
    }
};
