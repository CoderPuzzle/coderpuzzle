class Solution {
  public:
    bool simpleGraphExists(vector<int> &degrees) {
        sort(degrees.rbegin(), degrees.rend());
        int n = degrees.size();
        vector<long long> pre(n + 1, 0);
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + degrees[i];
        }
        long long total = pre[n];
        // An odd degree sum can never pair up into edges.
        if (total % 2 != 0) {
            return false;
        }
        // big tracks how many entries still exceed k; it only moves left.
        int big = n;
        for (int k = 0; k <= n; k++) {
            while (big > 0 && degrees[big - 1] <= k) {
                big--;
            }
            long long spared = (long long)k * max(big - k, 0) + total - pre[max(big, k)];
            if (pre[k] > (long long)k * (k - 1) + spared) {
                return false;
            }
        }
        return true;
    }
};
