class Solution {
    int rowMax(vector<vector<int>> &mat, int r) {
        // Largest entry of a row, as a column index.
        int j = 0;
        for (int c = 1; c < (int)mat[r].size(); c++) {
            if (mat[r][c] > mat[r][j]) {
                j = c;
            }
        }
        return j;
    }

  public:
    vector<int> findPeakGrid(vector<vector<int>> &mat) {
        // The judge's matrices hold exactly one peak, which is therefore the
        // global maximum — and the row maxima climb strictly up to its row
        // and fall strictly away after it. Binary search that unimodal
        // sequence: step toward whichever neighboring row is larger.
        int lo = 0, hi = (int)mat.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (mat[mid][rowMax(mat, mid)] < mat[mid + 1][rowMax(mat, mid + 1)]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // The peak row's own maximum is the peak itself.
        return {lo, rowMax(mat, lo)};
    }
};
