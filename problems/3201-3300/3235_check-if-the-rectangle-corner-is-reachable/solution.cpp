class Solution {
  public:
    bool canReachCorner(int xCorner, int yCorner, vector<vector<int>> &circles) {
        // Nodes 0..n-1 are the circles, then the top, right, bottom, and
        // left edges of the rectangle. Touching circles merge into obstacle
        // blobs, and a blob pinned to two edges blocks the corner-to-corner
        // path exactly for the pairs left-right, left-bottom, right-top,
        // and top-bottom: spanning walls cut the rectangle in half, while
        // the other two pairs fence off the start and goal corners. A
        // circle covering a corner touches both adjacent edges at once.
        int n = circles.size();
        int top = n, right = n + 1, bottom = n + 2, left = n + 3;
        vector<int> parent(n + 4);
        for (int node = 0; node < n + 4; ++node)
            parent[node] = node;
        for (int i = 0; i < n; ++i) {
            // Coordinates reach 1e9, so squared distances leave 32-bit
            // range; every product below runs in long long, exact for them.
            long long cx = circles[i][0], cy = circles[i][1];
            long long radius = circles[i][2];
            if (meetsEdge(cx, cy, radius, yCorner, false, xCorner, yCorner))
                unite(parent, top, i);
            if (meetsEdge(cx, cy, radius, xCorner, true, xCorner, yCorner))
                unite(parent, right, i);
            if (meetsEdge(cx, cy, radius, 0, false, xCorner, yCorner))
                unite(parent, bottom, i);
            if (meetsEdge(cx, cy, radius, 0, true, xCorner, yCorner))
                unite(parent, left, i);
            for (int j = 0; j < i; ++j) {
                long long dx = cx - circles[j][0];
                long long dy = cy - circles[j][1];
                long long rr = radius + circles[j][2];
                if (dx * dx + dy * dy <= rr * rr)
                    unite(parent, i, j);
            }
        }
        return find(parent, left) != find(parent, right) && find(parent, left) != find(parent, bottom) &&
               find(parent, right) != find(parent, top) && find(parent, top) != find(parent, bottom);
    }

  private:
    static bool meetsEdge(long long cx, long long cy, long long radius, long long fixed, bool vertical,
                          long long xCorner, long long yCorner) {
        long long px = vertical ? fixed : max(0LL, min(cx, xCorner));
        long long py = vertical ? max(0LL, min(cy, yCorner)) : fixed;
        return (cx - px) * (cx - px) + (cy - py) * (cy - py) <= radius * radius;
    }

    static int find(vector<int> &parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }

    static void unite(vector<int> &parent, int a, int b) { parent[find(parent, a)] = find(parent, b); }
};
