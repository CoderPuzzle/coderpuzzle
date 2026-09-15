class Solution {
  public:
    int maxSum(vector<int> &nums, int k, int m) {
        const long long NEG = LLONG_MIN / 4; // sentinel far below any reachable value
        const int n = (int)nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // dp over rows: prev[j] = best sum of (i-1) subarrays within first j elements
        vector<long long> prev(n + 1, 0); // i = 0
        for (int round = 1; round <= k; round++) {
            vector<long long> cur(n + 1, NEG);
            long long best = NEG; // running max of prev[t] - prefix[t] for t <= j - m
            for (int j = 1; j <= n; j++) {
                int t = j - m;
                if (t >= 0) {
                    long long cand = prev[t] - prefix[t];
                    if (cand > best)
                        best = cand;
                }
                if (best != NEG) {
                    long long val = prefix[j] + best;
                    cur[j] = cur[j - 1] > val ? cur[j - 1] : val;
                } else {
                    cur[j] = cur[j - 1];
                }
            }
            prev = cur;
        }
        return (int)prev[n];
    }
};
