class Solution {
  public:
    vector<vector<int>> reverseSubmatrix(vector<vector<int>> &grid, int x, int y, int k) {
        // Two pointers walk inward from the square's top and bottom rows;
        // each step exchanges the k columns the square spans. A middle row
        // of an odd-sided square pairs with itself and needs no work.
        int top = x, bottom = x + k - 1;
        while (top < bottom) {
            for (int j = y; j < y + k; ++j) {
                swap(grid[top][j], grid[bottom][j]);
            }
            ++top;
            --bottom;
        }
        return grid;
    }
};
