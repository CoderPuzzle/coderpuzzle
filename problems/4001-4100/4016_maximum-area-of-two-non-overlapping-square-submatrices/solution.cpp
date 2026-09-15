class Solution {
  public:
    int maxArea(vector<vector<int>> &mat) {
        int m = mat.size(), n = mat[0].size();
        // prefix[i][j] = usable cells in mat[0..i)[0..j): any k-square's fill
        // is then four lookups, so "all ones" is an O(1) test.
        vector<vector<int>> prefix(m + 1, vector<int>(n + 1, 0));
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                prefix[i + 1][j + 1] = prefix[i + 1][j] + prefix[i][j + 1] - prefix[i][j] + mat[i][j];

        // Binary search the largest feasible side; area is side squared.
        int lo = 0, hi = min(m, n);
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (hasDisjointPair(prefix, mid, m, n))
                lo = mid;
            else
                hi = mid - 1;
        }
        return lo * lo;
    }

  private:
    // A disjoint pair exists iff the valid corners span >= k rows or >= k
    // columns: extreme-row corners give disjoint row ranges, and if both
    // spans are < k every pair of squares intersects. The same corner twice
    // spans 0 < k, so it never counts as a pair.
    bool hasDisjointPair(vector<vector<int>> &prefix, int k, int m, int n) {
        int minRow = m + n, minCol = m + n, maxRow = -1, maxCol = -1;
        for (int r = 0; r + k <= m; ++r) {
            for (int c = 0; c + k <= n; ++c) {
                if (prefix[r + k][c + k] - prefix[r][c + k] - prefix[r + k][c] + prefix[r][c] == k * k) {
                    minRow = min(minRow, r);
                    maxRow = max(maxRow, r);
                    minCol = min(minCol, c);
                    maxCol = max(maxCol, c);
                }
            }
        }
        if (maxRow < 0)
            return false;
        return maxRow - minRow >= k || maxCol - minCol >= k;
    }
};
