class Solution {
  public:
    int minSwaps(vector<vector<int>> &grid) {
        int n = grid.size();
        vector<int> zeros(n);
        for (int i = 0; i < n; i++) {
            zeros[i] = trailingZeros(grid[i]);
        }

        int swaps = 0;
        for (int i = 0; i < n; i++) {
            int needed = n - i - 1;
            if (zeros[i] >= needed) {
                continue;
            }
            int j = i + 1;
            while (j < n && zeros[j] < needed) {
                j++;
            }
            if (j == n) {
                return -1;
            }
            while (j > i) {
                swap(zeros[j], zeros[j - 1]);
                j--;
                swaps++;
            }
        }
        return swaps;
    }

  private:
    int trailingZeros(const vector<int> &row) {
        int count = 0;
        for (int i = (int)row.size() - 1; i >= 0; i--) {
            if (row[i] != 0) {
                break;
            }
            count++;
        }
        return count;
    }
};
