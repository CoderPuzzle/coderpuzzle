class Solution {
  public:
    int kthSmallest(vector<vector<int>> &matrix, int k) {
        int n = matrix.size();
        long long lo = matrix[0][0], hi = matrix[n - 1][n - 1];
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2; // floor of (lo + hi) / 2
            if (countLe(matrix, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

  private:
    // Staircase walk from bottom-left: elements <= x.
    long long countLe(vector<vector<int>> &matrix, long long x) {
        int n = matrix.size();
        long long count = 0;
        int row = n - 1, col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= x) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }
};
