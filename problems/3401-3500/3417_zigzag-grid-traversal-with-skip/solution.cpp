class Solution {
  public:
    // Sweep the rows in zigzag order (even rows left-to-right, odd rows
    // reversed) flipping a take/skip toggle at every cell.
    vector<int> zigzagTraversal(vector<vector<int>> &grid) {
        vector<int> result;
        bool take = true;
        for (size_t i = 0; i < grid.size(); ++i) {
            if (i % 2 == 0) {
                for (int value : grid[i]) {
                    if (take)
                        result.push_back(value);
                    take = !take;
                }
            } else {
                for (auto it = grid[i].rbegin(); it != grid[i].rend(); ++it) {
                    if (take)
                        result.push_back(*it);
                    take = !take;
                }
            }
        }
        return result;
    }
};
