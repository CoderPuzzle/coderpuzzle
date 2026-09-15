class Solution {
  public:
    int sumCounts(vector<int> &nums) {
        // Fenwick pair over the per-start distinct counts d[j] of the windows
        // ending at the current index: range-add and range-sum of exact
        // counts. Range sums reach n(n+1)/2 ~ 5*10^9, past 32 bits, so every
        // accumulator stays in long long.
        const long long MOD = 1000000007LL;
        int n = nums.size();
        vector<long long> b1(n + 2, 0), b2(n + 2, 0);
        auto add = [&](int l, int r, long long v) {
            for (int x = l; x <= n + 1; x += x & -x) {
                b1[x] += v;
                b2[x] += v * (l - 1);
            }
            for (int x = r + 1; x <= n + 1; x += x & -x) {
                b1[x] -= v;
                b2[x] -= v * r;
            }
        };
        auto prefix = [&](int x) {
            int x0 = x;
            long long s1 = 0, s2 = 0;
            for (; x > 0; x -= x & -x) {
                s1 += b1[x];
                s2 += b2[x];
            }
            return s1 * x0 - s2;
        };
        vector<int> last(100001, -1);
        long long answer = 0, running = 0;
        for (int i = 0; i < n; ++i) {
            int lo = last[nums[i]] + 2;
            // Windows opened in (last, i-1] each gain one distinct value, so
            // their squares grow by 2*d + 1; the fresh window contributes
            // 1^2. T is the exact pre-increment sum over the gaining range.
            long long t = lo <= i ? prefix(i) - prefix(lo - 1) : 0;
            running = (running + 2 * t + (i - lo + 2)) % MOD;
            answer = (answer + running) % MOD;
            if (lo <= i) {
                add(lo, i, 1);
            }
            add(i + 1, i + 1, 1);
            last[nums[i]] = i;
        }
        return static_cast<int>(answer);
    }
};
