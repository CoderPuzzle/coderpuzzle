class Solution {
  public:
    long long maxSubarrays(int n, vector<vector<int>> &conflictingPairs) {
        // bucket each pair at its smaller element; g[a] collects the larger endpoints
        vector<vector<int>> g(n + 1);
        for (auto &pair : conflictingPairs) {
            int a = pair[0], b = pair[1];
            if (a > b)
                swap(a, b);
            g[a].push_back(b);
        }
        vector<long long> cnt(n + 2, 0);
        long long ans = 0, add = 0;
        int b1 = n + 1, b2 = n + 1;
        // sweep left endpoints right to left; b1, b2 are the smallest and
        // second-smallest right endpoint among pairs whose smaller side is >= a
        for (int a = n; a >= 1; a--) {
            for (int b : g[a]) {
                if (b < b1) {
                    b2 = b1;
                    b1 = b;
                } else if (b < b2) {
                    b2 = b;
                }
            }
            // a subarray starting at a stays valid up to just before b1
            ans += (long long)b1 - a;
            // removing the pair that uniquely supplies b1 relaxes its bound to
            // b2; bank b2 - b1 keyed by b1 (duplicate b's land in b2, gain 0)
            cnt[b1] += (long long)(b2 - b1);
            if (cnt[b1] > add) {
                add = cnt[b1];
            }
        }
        ans += add;
        return ans;
    }
};
