class Solution {
  public:
    int minimumEffortPath(vector<vector<int>> &heights) {
        int rows = heights.size();
        int cols = heights[0].size();
        int total = rows * cols;
        // One edge per adjacent pair (right and down neighbor), endpoints
        // flattened to r*cols + c.
        vector<array<int, 3>> edges;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (r + 1 < rows)
                    edges.push_back({abs(heights[r + 1][c] - heights[r][c]), r * cols + c, (r + 1) * cols + c});
                if (c + 1 < cols)
                    edges.push_back({abs(heights[r][c + 1] - heights[r][c]), r * cols + c, r * cols + c + 1});
            }
        }
        // Ascending weight order is Kruskal's skeleton: the first edge that
        // joins the two corners is the minimum possible maximum.
        sort(edges.begin(), edges.end());
        parent.resize(total);
        sz.resize(total, 1);
        for (int i = 0; i < total; i++)
            parent[i] = i;
        // A 1x1 grid is connected to itself from the start.
        if (find(0) == find(total - 1))
            return 0;
        for (const auto &edge : edges) {
            if (find(edge[1]) == find(edge[2]))
                continue;
            unite(edge[1], edge[2]);
            // Once both corners share a component, every path between them
            // uses some edge of weight at least w, and w already suffices.
            if (find(0) == find(total - 1))
                return edge[0];
        }
        return 0;
    }

  private:
    vector<int> parent;
    vector<int> sz;

    int find(int x) {
        // Path compression keeps later finds near O(1).
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb)
            return;
        // Union by size keeps the trees shallow.
        if (sz[ra] < sz[rb])
            swap(ra, rb);
        parent[rb] = ra;
        sz[ra] += sz[rb];
    }
};
