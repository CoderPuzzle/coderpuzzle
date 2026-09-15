class Solution {
  public:
    long long maxTotalValue(vector<int> &nums, int k) {
        int n = nums.size();
        // Sparse tables: level j holds the max/min of every window of
        // length 2^j, each derived from the previous level in one pass.
        int levels = 32 - __builtin_clz(n);
        vector<vector<int>> mx(levels), mn(levels);
        mx[0] = nums;
        mn[0] = nums;
        for (int j = 1; j < levels; ++j) {
            int half = 1 << (j - 1);
            int len = n - (1 << j) + 1;
            mx[j].resize(len);
            mn[j].resize(len);
            for (int i = 0; i < len; ++i) {
                mx[j][i] = max(mx[j - 1][i], mx[j - 1][i + half]);
                mn[j][i] = min(mn[j - 1][i], mn[j - 1][i + half]);
            }
        }
        vector<int> lg(n + 1, 0);
        for (int i = 2; i <= n; ++i) {
            lg[i] = lg[i >> 1] + 1;
        }
        // Two overlapping power-of-two windows cover [l, r].
        auto spread = [&](int l, int r) {
            int j = lg[r - l + 1];
            int low = 1 << j;
            return (long long)max(mx[j][l], mx[j][r - low + 1]) - min(mn[j][l], mn[j][r - low + 1]);
        };
        // Row l is non-increasing as r shrinks toward l, so the heap merges
        // n sorted rows and always holds each row's largest unseen entry.
        priority_queue<tuple<long long, int, int>> heap;
        for (int l = 0; l < n; ++l) {
            heap.push({spread(l, n - 1), l, n - 1});
        }
        long long total = 0;
        for (int picked = 0; picked < k; ++picked) {
            auto [value, l, r] = heap.top();
            heap.pop();
            total += value;
            if (r > l) {
                heap.push({spread(l, r - 1), l, r - 1});
            }
        }
        return total;
    }
};
