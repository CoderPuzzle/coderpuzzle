class Solution {
  public:
    bool searchMatrix(vector<vector<int>> &matrix, int target) {
        if (matrix.empty() || matrix[0].empty())
            return false;
        int cols = matrix[0].size();
        for (const auto &row : matrix) {
            // Columns are sorted, so once a row's first element already
            // exceeds the target, every later row starts even larger — the
            // target cannot exist below, so stop scanning entirely.
            if (row[0] > target)
                break;
            // Each row is sorted, so binary-search it in O(log n).
            int lo = 0, hi = cols - 1;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (row[mid] < target)
                    lo = mid + 1;
                else
                    hi = mid;
            }
            // lo lands on the leftmost element >= target; equality means
            // the target is present in this row.
            if (row[lo] == target)
                return true;
        }
        // m rows each searched in O(log n): O(m log n), versus the
        // staircase's O(m + n).
        return false;
    }
};
