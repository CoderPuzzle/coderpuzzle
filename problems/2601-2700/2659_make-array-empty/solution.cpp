class Solution {
  public:
    long long countOperationsToEmptyArray(vector<int> &nums) {
        int n = nums.size();
        if (n == 0)
            return 0;

        vector<long long> tree(n + 1, 0);

        int topBit = 1;
        while ((long long)topBit * 2 <= n)
            topBit *= 2;

        auto add = [&](int i, long long delta) {
            for (; i <= n; i += i & (-i))
                tree[i] += delta;
        };
        auto prefix = [&](int i) {
            long long s = 0;
            for (; i > 0; i -= i & (-i))
                s += tree[i];
            return s;
        };
        auto kth = [&](int k) {
            int idx = 0;
            for (int bit = topBit; bit > 0; bit >>= 1) {
                int nxt = idx + bit;
                if (nxt <= n && tree[nxt] < k) {
                    idx = nxt;
                    k -= (int)tree[nxt];
                }
            }
            return idx + 1;
        };

        for (int i = 1; i <= n; i++)
            add(i, 1);

        vector<int> order(n);
        for (int i = 0; i < n; i++)
            order[i] = i;
        sort(order.begin(), order.end(), [&](int a, int b) {
            if (nums[a] != nums[b])
                return nums[a] < nums[b];
            return a < b;
        });

        long long ops = 0;
        int cur = 1;
        int removed = 0;
        for (int idx : order) {
            int pos = idx + 1;
            if (pos >= cur) {
                ops += prefix(pos) - prefix(cur - 1);
            } else {
                ops += prefix(n) - prefix(cur - 1) + prefix(pos);
            }
            add(pos, -1);
            removed++;
            int remaining = n - removed;
            if (remaining > 0) {
                int rankAfter = (int)prefix(pos);
                int nextRank = (rankAfter % remaining) + 1;
                cur = kth(nextRank);
            }
        }
        return ops;
    }
};
