class Solution {
  public:
    int latestDayToCross(int row, int col, vector<vector<int>> &cells) {
        int n = row * col;
        int top = n, bottom = n + 1; // virtual sentinels: one node per shore
        vector<int> parent(n + 2), size(n + 2, 1);
        for (int i = 0; i < n + 2; i++)
            parent[i] = i;
        vector<vector<bool>> active(row, vector<bool>(col, false));
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        // Walk the days backwards: one cell of land reappears per step, so
        // connectivity only grows. After absorbing cells[i] the grid state is
        // exactly "day i" (cells[:i] still flooded), so the first moment the
        // shores share a root, day i is the last crossable day.
        for (int i = n - 1; i >= 0; i--) {
            int r = cells[i][0] - 1, c = cells[i][1] - 1;
            active[r][c] = true;
            int land = r * col + c;
            if (r == 0)
                unite(parent, size, land, top);
            if (r == row - 1)
                unite(parent, size, land, bottom);
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < row && nc >= 0 && nc < col && active[nr][nc])
                    unite(parent, size, land, nr * col + nc);
            }
            if (find(parent, top) == find(parent, bottom))
                return i; // the shores just met: no later day can cross
        }
        return 0; // unreachable: with row, col >= 2 even day 1 always crosses
    }

  private:
    int find(vector<int> &parent, int x) {
        // Path halving keeps the trees flat without a second pass.
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(vector<int> &parent, vector<int> &size, int a, int b) {
        int root_a = find(parent, a), root_b = find(parent, b);
        if (root_a == root_b)
            return;
        // Union by size: hang the smaller tree under the larger.
        if (size[root_a] < size[root_b])
            swap(root_a, root_b);
        parent[root_b] = root_a;
        size[root_a] += size[root_b];
    }
};
