struct SwapBIT {
    int n;
    vector<int> c;
    vector<long long> s;
    SwapBIT(int n) : n(n), c(n + 1), s(n + 1) {}
    void add(int p, int dc, long long ds) {
        for (++p; p <= n; p += p & -p)
            c[p] += dc, s[p] += ds;
    }
    pair<int, long long> pref(int p) {
        int x = 0;
        long long y = 0;
        for (; p; p -= p & -p)
            x += c[p], y += s[p];
        return {x, y};
    }
    int kth(int k) {
        int p = 0;
        for (int z = 1 << (31 - __builtin_clz(n)); z; z >>= 1)
            if (p + z <= n && c[p + z] < k)
                k -= c[p += z];
        return p;
    }
    long long small(int k, vector<int> &v) {
        if (!k)
            return 0;
        int p = kth(k);
        auto [x, y] = pref(p);
        return y + 1LL * (k - x) * v[p];
    }
};
class Solution {
  public:
    long long maxSum(vector<int> &a, int k) {
        int n = a.size();
        vector<int> v = a;
        sort(v.begin(), v.end());
        v.erase(unique(v.begin(), v.end()), v.end());
        vector<int> p(n);
        for (int i = 0; i < n; i++)
            p[i] = lower_bound(v.begin(), v.end(), a[i]) - v.begin();
        long long best = LLONG_MIN;
        for (int l = 0; l < n; l++) {
            SwapBIT in(v.size()), out(v.size());
            for (int i = 0; i < n; i++)
                if (i < l || i >= l)
                    out.add(p[i], 1, a[i]);
            long long sum = 0;
            for (int r = l; r < n; r++) {
                out.add(p[r], -1, -a[r]);
                in.add(p[r], 1, a[r]);
                sum += a[r];
                int oc = n - (r - l + 1), lo = 0, hi = min({k, r - l + 1, oc});
                while (lo < hi) {
                    int t = (lo + hi + 1) / 2;
                    if (v[out.kth(oc - t + 1)] > v[in.kth(t)])
                        lo = t;
                    else
                        hi = t - 1;
                }
                long long gain = out.small(oc, v) - out.small(oc - lo, v) - in.small(lo, v);
                best = max(best, sum + gain);
            }
        }
        return best;
    }
};
