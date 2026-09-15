class Solution {
  public:
    int islandPerimeter(vector<vector<int>> &grid) {
        // Every land cell owns four unit edges of boundary; each horizontal
        // or vertical pair of land neighbours hides two of them — one edge on
        // each side of the shared border.
        int perimeter = 0;
        for (int r = 0; r < (int)grid.size(); ++r) {
            for (int c = 0; c < (int)grid[r].size(); ++c) {
                if (grid[r][c] == 1) {
                    perimeter += 4;
                    // Looking only up and left visits each adjacent pair
                    // exactly once, so the later cell charges the pair's
                    // full two-edge cost in one place.
                    if (r > 0 && grid[r - 1][c] == 1)
                        perimeter -= 2;
                    if (c > 0 && grid[r][c - 1] == 1)
                        perimeter -= 2;
                }
            }
        }
        // One island and no lakes: every counted edge lies on the single
        // outer outline, so the sweep total is the whole perimeter.
        return perimeter;
    }
};
