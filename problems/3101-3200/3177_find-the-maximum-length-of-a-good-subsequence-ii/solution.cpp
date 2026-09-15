class Solution {
  public:
    int maximumLength(vector<int> &nums, int k) {
        // remap values to compact ids
        unordered_map<int, int> mapping;
        int n = nums.size();
        vector<int> remapped(n);
        for (int i = 0; i < n; i++) {
            auto it = mapping.find(nums[i]);
            if (it == mapping.end()) {
                it = mapping.emplace(nums[i], (int)mapping.size()).first;
            }
            remapped[i] = it->second;
        }
        int v = (int)mapping.size();

        // dp[j][x] = max length of a good subsequence ending with value x
        // having exactly j transitions
        vector<vector<int>> dp(k + 1, vector<int>(v, 0));
        vector<int> best1(k + 1, 0); // max over x of dp[j][x]
        vector<int> val1(k + 1, -1); // argmax
        vector<int> best2(k + 1, 0); // second max over x != val1

        for (int x : remapped) {
            vector<int> cand(k + 1, 0);
            for (int j = 0; j <= k; j++) {
                int c = dp[j][x] + 1; // extend a same-value subsequence
                if (j > 0) {
                    int top = val1[j - 1] != x ? best1[j - 1] : best2[j - 1];
                    int diff = top + 1; // append after a different value
                    if (diff > c) {
                        c = diff;
                    }
                }
                if (j == 0 && 1 > c) {
                    c = 1;
                }
                cand[j] = c;
            }
            for (int j = 0; j <= k; j++) {
                int nv = cand[j];
                if (nv <= dp[j][x]) {
                    continue;
                }
                dp[j][x] = nv;
                if (val1[j] == x) {
                    best1[j] = nv;
                } else {
                    if (nv > best1[j]) {
                        best2[j] = best1[j];
                        best1[j] = nv;
                        val1[j] = x;
                    } else if (nv > best2[j]) {
                        best2[j] = nv;
                    }
                }
            }
        }

        int ans = 0;
        for (int j = 0; j <= k; j++) {
            ans = max(ans, best1[j]);
        }
        return ans;
    }
};
