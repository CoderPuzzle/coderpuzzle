class Solution {
  public:
    int matrixMedian(vector<vector<int>> &grid) {
        int m = grid.size(), n = grid[0].size();
        // Odd element count, so the median is the m*n/2+1-th smallest value
        // — an actual matrix entry, returned exactly.
        long long need = (long long)m * n / 2 + 1;
        // Binary-search the value itself between the smallest row head and
        // the largest row tail.
        int lo = INT_MAX, hi = INT_MIN;
        for (const auto &row : grid) {
            lo = min(lo, row.front());
            hi = max(hi, row.back());
        }
        auto countLe = [&](int x) {
            // Each row is sorted, so upper_bound counts its <=x entries in
            // O(log n); row counts add up across the matrix.
            long long total = 0;
            for (const auto &row : grid) {
                total += upper_bound(row.begin(), row.end(), x) - row.begin();
            }
            return total;
        };
        // Find the smallest x with countLe(x) >= need. It must occur in
        // the matrix, else the counts at x and x-1 would be equal.
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLe(mid) >= need)
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }
};
