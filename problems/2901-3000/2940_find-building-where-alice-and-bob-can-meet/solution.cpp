class Solution {
  public:
    vector<int> leftmostBuildingQueries(vector<int> &heights, vector<vector<int>> &queries) {
        int n = (int)heights.size();
        // Max segment tree over heights, padded to a power of two: leaves hold
        // heights, each parent the max of its children.
        int size = 1;
        while (size < n) {
            size <<= 1;
        }
        vector<long long> seg(2 * size, 0);
        for (int i = 0; i < n; i++) {
            seg[size + i] = heights[i];
        }
        for (int i = size - 1; i >= 1; i--) {
            seg[i] = max(seg[2 * i], seg[2 * i + 1]);
        }

        vector<int> result;
        result.reserve(queries.size());
        // Movements only go rightward and strictly upward in height.
        for (auto &qr : queries) {
            int a = qr[0];
            int b = qr[1];
            if (a > b) {
                swap(a, b);
            }
            if (a == b) {
                result.push_back(a);
            } else if (heights[a] < heights[b]) {
                result.push_back(b);
            } else {
                // The taller building sets the bar both must clear strictly
                // right of b; find the leftmost one above it.
                long long threshold = max((long long)heights[a], (long long)heights[b]);
                result.push_back(findFirst(seg, 1, 0, size, b + 1, n, threshold));
            }
        }
        return result;
    }

  private:
    // First index in [ql, qr) whose height exceeds threshold, or -1.
    int findFirst(vector<long long> &seg, int node, int nl, int nr, int ql, int qr, long long threshold) {
        // Prune any node outside the query range or whose max cannot qualify.
        if (nr <= ql || qr <= nl || seg[node] <= threshold) {
            return -1;
        }
        if (nr - nl == 1) {
            return nl;
        }
        int mid = (nl + nr) / 2;
        // Left child first, so the first leaf reached is the leftmost hit.
        int res = findFirst(seg, 2 * node, nl, mid, ql, qr, threshold);
        if (res != -1) {
            return res;
        }
        return findFirst(seg, 2 * node + 1, mid, nr, ql, qr, threshold);
    }
};
