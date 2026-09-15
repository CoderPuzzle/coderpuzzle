class Solution {
  public:
    vector<vector<int>> rotateGrid(vector<vector<int>> &grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> out(m, vector<int>(n));
        // Each layer is peeled into a ring walked counter-clockwise from its
        // top-left corner. Rotating the layer k times moves every element k
        // steps along that walk, which is one right-rotation of the ring by
        // k % ring_len; the ring is then written back along the same walk.
        for (int l = 0; l < min(m, n) / 2; l++) {
            int top = l, left = l, bottom = m - 1 - l, right = n - 1 - l;
            vector<pair<int, int>> pos;
            for (int r = top; r <= bottom; r++)
                pos.push_back({r, left});
            for (int c = left + 1; c <= right; c++)
                pos.push_back({bottom, c});
            for (int r = bottom - 1; r >= top; r--)
                pos.push_back({r, right});
            for (int c = right - 1; c > left; c--)
                pos.push_back({top, c});
            int len = pos.size(), s = k % len;
            for (int i = 0; i < len; i++) {
                auto from = pos[(i - s + len) % len];
                auto to = pos[i];
                out[to.first][to.second] = grid[from.first][from.second];
            }
        }
        return out;
    }
};
