class Solution {
  public:
    long long getSum(vector<int> &a) {
        int n = a.size(), l = 0, r = -1;
        vector<int> d1(n), d2(n);
        for (int i = 0; i < n; i++) {
            int k = i > r ? 1 : min(d1[l + r - i], r - i + 1);
            while (i - k >= 0 && i + k < n && a[i - k] == a[i + k])
                k++;
            d1[i] = k;
            if (i + k - 1 > r)
                l = i - k + 1, r = i + k - 1;
        }
        l = 0;
        r = -1;
        for (int i = 0; i < n; i++) {
            int k = i > r ? 0 : min(d2[l + r - i + 1], r - i + 1);
            while (i - k - 1 >= 0 && i + k < n && a[i - k - 1] == a[i + k])
                k++;
            d2[i] = k;
            if (i + k - 1 > r)
                l = i - k, r = i + k - 1;
        }
        vector<long long> p(n + 1);
        for (int i = 0; i < n; i++)
            p[i + 1] = p[i] + a[i];
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            ans = max(ans, p[i + d1[i]] - p[i - d1[i] + 1]);
            ans = max(ans, p[i + d2[i]] - p[i - d2[i]]);
        }
        return ans;
    }
};
