class Solution {
  public:
    int maximumMinimumPath(vector<vector<int>> &grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        // Kruskal-style admission: switch cells on biggest-first and stop the
        // moment the two corners join one admitted component -- the value of
        // the cell admitted last is the widest bottleneck any walk can hold.
        vector<tuple<int, int, int>> cells;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                cells.emplace_back(grid[r][c], r, c);
            }
        }
        // Falling order of value: the biggest cells are admitted first.
        sort(cells.begin(), cells.end(), [](const auto &a, const auto &b) { return a > b; });
        int total = rows * cols;
        // parent[i] is -1 while cell i is unadmitted, else its union-find parent.
        vector<int> parent(total, -1);
        // An unadmitted cell is its own isolated root; path halving keeps the
        // forest nearly flat.
        auto find = [&](int i) {
            if (parent[i] == -1)
                return i;
            while (parent[i] != i) {
                parent[i] = parent[parent[i]];
                i = parent[i];
            }
            return i;
        };
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (auto &[value, r, c] : cells) {
            int idx = r * cols + c;
            // Admit the cell: it becomes its own root, then merges with every
            // already-admitted neighbour.
            parent[idx] = idx;
            for (auto &dir : dirs) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && parent[nr * cols + nc] != -1) {
                    int ra = find(idx);
                    int rb = find(nr * cols + nc);
                    if (ra != rb)
                        parent[ra] = rb;
                }
            }
            if (find(0) == find(total - 1))
                return value;
        }
        // The full grid is connected, so the loop always returns inside.
        return 0;
    }
};
