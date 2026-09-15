class Solution {
  public:
    int containVirus(vector<vector<int>> &isInfected) {
        // Nothing here is a choice: each day the region whose frontier (the
        // uninfected cells it would reach tonight) is largest gets walled,
        // every other region infects its frontier, and the answer just
        // accumulates the daily wall counts until no frontier is left.
        vector<vector<int>> grid = isInfected;
        int rows = grid.size();
        int cols = grid[0].size();
        int walls = 0;
        while (true) {
            vector<vector<int>> label(rows, vector<int>(cols, -1));
            vector<Region> regions;
            for (int row = 0; row < rows; ++row) {
                for (int col = 0; col < cols; ++col) {
                    if (grid[row][col] == 1 && label[row][col] < 0) {
                        regions.push_back(measure(grid, label, row, col, (int)regions.size()));
                    }
                }
            }
            if (regions.empty()) {
                return walls;
            }
            int best = 0;
            for (int i = 1; i < (int)regions.size(); ++i) {
                if (regions[i].frontier.size() > regions[best].frontier.size()) {
                    best = i;
                }
            }
            // No region threatens anything: the outbreak is over, walled or
            // fully spread.
            if (regions[best].frontier.empty()) {
                return walls;
            }
            walls += regions[best].walls;
            // 2 marks the quarantined region: inert, never spreading again
            // and never part of a later region.
            for (const auto &cell : regions[best].cells) {
                grid[cell.first][cell.second] = 2;
            }
            // The night: everyone else infects their frontier at once. A
            // cell the walled region had threatened still falls to an active
            // region — walls seal only the edges they stand on.
            for (int i = 0; i < (int)regions.size(); ++i) {
                if (i == best) {
                    continue;
                }
                for (int cell : regions[i].frontier) {
                    grid[cell / cols][cell % cols] = 1;
                }
            }
        }
    }

  private:
    struct Region {
        vector<pair<int, int>> cells;
        unordered_set<int> frontier;
        int walls = 0;
    };

    Region measure(vector<vector<int>> &grid, vector<vector<int>> &label, int row, int col, int id) {
        // Walk one region with an explicit stack, collecting its cells, its
        // frontier (distinct threatened 0-cells, encoded row*cols+col) and
        // its wall count — one wall per region/0-cell shared edge.
        int rows = grid.size();
        int cols = grid[0].size();
        Region region;
        label[row][col] = id;
        vector<pair<int, int>> stack;
        stack.push_back({row, col});
        const int dr[4] = {-1, 1, 0, 0};
        const int dc[4] = {0, 0, -1, 1};
        while (!stack.empty()) {
            pair<int, int> cell = stack.back();
            stack.pop_back();
            region.cells.push_back(cell);
            for (int d = 0; d < 4; ++d) {
                int r = cell.first + dr[d];
                int c = cell.second + dc[d];
                if (r < 0 || r >= rows || c < 0 || c >= cols) {
                    continue;
                }
                if (grid[r][c] == 0) {
                    region.frontier.insert(r * cols + c);
                    region.walls++;
                } else if (grid[r][c] == 1 && label[r][c] < 0) {
                    label[r][c] = id;
                    stack.push_back({r, c});
                }
            }
        }
        return region;
    }
};
