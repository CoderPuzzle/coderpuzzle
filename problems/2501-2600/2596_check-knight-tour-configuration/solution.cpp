class Solution {
  public:
    bool checkValidGrid(std::vector<std::vector<int>> &grid) {
        // The configuration is valid exactly when visit 0 sits at the
        // top-left cell and every pair of consecutive visits lands a
        // knight move apart. Map each visit number to its cell, then
        // verify the deltas pairwise with the arithmetic move test
        // (one step in one axis, two steps in the other).
        if (grid[0][0] != 0)
            return false;
        int n = static_cast<int>(grid.size());
        std::vector<std::pair<int, int>> pos(n * n);
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                pos[grid[r][c]] = {r, c};
            }
        }
        for (int step = 1; step < n * n; step++) {
            int dr = std::abs(pos[step].first - pos[step - 1].first);
            int dc = std::abs(pos[step].second - pos[step - 1].second);
            if ((dr != 1 || dc != 2) && (dr != 2 || dc != 1))
                return false;
        }
        return true;
    }
};
