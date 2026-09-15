class Solution {
  public:
    bool removeOnes(vector<vector<int>> &grid) {
        for (int row = 0; row < static_cast<int>(grid.size()); row++) {
            for (int column = 0; column < static_cast<int>(grid[0].size()); column++) {
                if ((grid[row][column] ^ grid[row][0] ^ grid[0][column] ^ grid[0][0]) != 0) {
                    return false;
                }
            }
        }
        return true;
    }
};
