class Solution {
  public:
    // Per supplier: sorted boxes assign each package its smallest fitting
    // size; waste = count*(box) - range package sum via prefix sums.
    // Skip suppliers whose largest box is too small.
    long long minWastedSpace(vector<int> &packages, vector<vector<int>> &boxes) {
        int n = packages.size();
        vector<long long> pkg(packages.begin(), packages.end());
        sort(pkg.begin(), pkg.end());
        vector<long long> pre(n + 1, 0);
        for (int i = 0; i < n; i++)
            pre[i + 1] = pre[i] + pkg[i];
        long long best = -1;
        for (auto &supplier : boxes) {
            vector<int> s = supplier;
            sort(s.begin(), s.end());
            if ((long long)s.back() < pkg[n - 1])
                continue;
            long long waste = 0;
            int prev = 0;
            for (int b : s) {
                int cnt = upper_bound(pkg.begin(), pkg.end(), (long long)b) - pkg.begin();
                if (cnt > prev) {
                    waste += (long long)(cnt - prev) * b - (pre[cnt] - pre[prev]);
                    prev = cnt;
                }
                if (prev == n)
                    break;
            }
            if (best < 0 || waste < best)
                best = waste;
        }
        if (best < 0)
            return -1;
        return best % 1000000007LL;
    }
};
