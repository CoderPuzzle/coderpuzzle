class Solution {
  public:
    int cutOffTree(vector<vector<int>> &forest) {
        // The order is not a choice: the trees must fall shortest to tallest.
        // What is left to plan is only the walk between consecutive trees,
        // and each of those legs is an unweighted shortest path — a plain
        // BFS. Cutting a tree rewrites its cell to 1, which is still
        // walkable, so every leg can search the original forest unchanged.
        vector<vector<int>> trees;
        for (int row = 0; row < (int)forest.size(); ++row) {
            for (int col = 0; col < (int)forest[0].size(); ++col) {
                if (forest[row][col] > 1) {
                    trees.push_back({forest[row][col], row, col});
                }
            }
        }
        sort(trees.begin(), trees.end(), [](const vector<int> &a, const vector<int> &b) { return a[0] < b[0]; });
        int total = 0;
        int row = 0;
        int col = 0;
        for (const vector<int> &tree : trees) {
            int steps = walk(forest, row, col, tree[1], tree[2]);
            if (steps < 0) {
                return -1;
            }
            total += steps;
            row = tree[1];
            col = tree[2];
        }
        return total;
    }

  private:
    int walk(vector<vector<int>> &forest, int startRow, int startCol, int targetRow, int targetCol) {
        // A wall under the walker means the leg never begins; only the
        // initial (0, 0) can actually be a 0 cell.
        if (forest[startRow][startCol] == 0) {
            return -1;
        }
        if (startRow == targetRow && startCol == targetCol) {
            return 0;
        }
        int rows = forest.size();
        int cols = forest[0].size();
        queue<pair<int, int>> pending;
        vector<vector<int>> distance(rows, vector<int>(cols, -1));
        distance[startRow][startCol] = 0;
        pending.push({startRow, startCol});
        const int dr[4] = {-1, 1, 0, 0};
        const int dc[4] = {0, 0, -1, 1};
        while (!pending.empty()) {
            pair<int, int> cell = pending.front();
            pending.pop();
            int near = distance[cell.first][cell.second] + 1;
            for (int d = 0; d < 4; ++d) {
                int row = cell.first + dr[d];
                int col = cell.second + dc[d];
                // Trees and empty cells are both walkable; only 0 is not.
                if (row < 0 || row >= rows || col < 0 || col >= cols || forest[row][col] == 0 ||
                    distance[row][col] >= 0) {
                    continue;
                }
                if (row == targetRow && col == targetCol) {
                    return near;
                }
                distance[row][col] = near;
                pending.push({row, col});
            }
        }
        return -1;
    }
};
