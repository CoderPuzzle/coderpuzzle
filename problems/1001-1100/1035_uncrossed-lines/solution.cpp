class Solution {
  public:
    int maxUncrossedLines(vector<int> &nums1, vector<int> &nums2) {
        int n = nums2.size();
        vector<int> prev(n + 1, 0);
        for (int a : nums1) {
            vector<int> cur(n + 1, 0);
            for (int j = 1; j <= n; j++) {
                if (a == nums2[j - 1]) {
                    cur[j] = prev[j - 1] + 1;
                } else {
                    cur[j] = max(cur[j - 1], prev[j]);
                }
            }
            prev = move(cur);
        }
        return prev[n];
    }
};
