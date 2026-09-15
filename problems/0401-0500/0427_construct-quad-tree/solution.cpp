class Solution {
  public:
    QuadNode *construct(vector<vector<int>> &grid) { return build(grid, 0, 0, (int)grid.size()); }

  private:
    QuadNode *build(vector<vector<int>> &grid, int r0, int c0, int size) {
        int first = grid[r0][c0];
        bool uniform = true;
        for (int r = r0; uniform && r < r0 + size; ++r) {
            for (int c = c0; c < c0 + size; ++c) {
                if (grid[r][c] != first) {
                    uniform = false;
                    break;
                }
            }
        }
        if (uniform)
            return new QuadNode(first == 1, true);
        int half = size / 2;
        return new QuadNode(false, false, build(grid, r0, c0, half), build(grid, r0, c0 + half, half),
                            build(grid, r0 + half, c0, half), build(grid, r0 + half, c0 + half, half));
    }
};
