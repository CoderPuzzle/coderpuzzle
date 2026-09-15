class Solution {
  public:
    vector<int> pathExistenceQueries(int n, vector<int> &nums, int maxDiff, vector<vector<int>> &queries) {
        // In value-sorted order each node reaches a contiguous range of
        // positions, so the farthest position reachable in k hops composes
        // monotonically and binary lifting on the one-hop reach returns hop
        // counts in O(log n) per query.
        vector<int> order(n), rank(n), comp(n), reach(n);
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return nums[a] < nums[b]; });
        for (int pos = 0; pos < n; pos++)
            rank[order[pos]] = pos;
        for (int pos = 1; pos < n; pos++)
            comp[pos] = comp[pos - 1] + (nums[order[pos]] - nums[order[pos - 1]] > maxDiff ? 1 : 0);
        for (int i = 0, j = 0; i < n; i++) {
            if (j < i)
                j = i;
            while (j + 1 < n && nums[order[j + 1]] - nums[order[i]] <= maxDiff)
                j++;
            reach[i] = j;
        }

        // up[k][i] = farthest position reachable from i in at most 2^k hops.
        int logn = 1;
        while ((1 << logn) < n)
            logn++;
        logn++;
        vector<vector<int>> up(logn, vector<int>(n));
        up[0] = reach;
        for (int k = 1; k < logn; k++)
            for (int i = 0; i < n; i++)
                up[k][i] = up[k - 1][up[k - 1][i]];

        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            int su = rank[q[0]], sv = rank[q[1]];
            if (comp[su] != comp[sv]) {
                answer.push_back(-1);
            } else if (su == sv) {
                answer.push_back(0);
            } else {
                if (su > sv)
                    swap(su, sv);
                int hops = 0;
                for (int k = logn - 1; k >= 0; k--) {
                    if (up[k][su] < sv) {
                        su = up[k][su];
                        hops += 1 << k;
                    }
                }
                answer.push_back(hops + 1);
            }
        }
        return answer;
    }
};
