class Solution {
  public:
    string minInteger(string num, int k) {
        int n = num.size();
        // Fenwick tree over 1..n; tree[p] = 1 means the digit originally at
        // position p is still unplaced. Prefix sums answer "how many
        // unplaced digits sit before position p" in O(log n).
        vector<int> tree(n + 1, 0);
        auto update = [&](int i, int delta) {
            for (; i <= n; i += i & (-i)) {
                tree[i] += delta;
            }
        };
        auto query = [&](int i) {
            int total = 0;
            for (; i > 0; i -= i & (-i)) {
                total += tree[i];
            }
            return total;
        };
        for (int i = 1; i <= n; i++) {
            update(i, 1);
        }

        // Per-digit queues of remaining original (1-indexed) positions, in
        // increasing order, so the front is always the cheapest to reach.
        array<deque<int>, 10> positions;
        for (int i = 0; i < n; i++) {
            positions[num[i] - '0'].push_back(i + 1);
        }

        string result;
        result.reserve(n);
        for (int step = 0; step < n; step++) {
            for (int d = 0; d < 10; d++) {
                if (positions[d].empty()) {
                    continue;
                }
                int p = positions[d].front();
                // Cost to bring this digit to the front of the unplaced
                // suffix: one swap per still-active digit before it.
                int cost = query(p - 1);
                if (cost <= k) {
                    positions[d].pop_front();
                    update(p, -1);
                    k -= cost;
                    result.push_back('0' + d);
                    break;
                }
            }
        }
        return result;
    }
};
