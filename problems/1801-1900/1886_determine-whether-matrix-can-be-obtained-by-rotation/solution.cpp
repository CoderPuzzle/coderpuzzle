class Solution {
  public:
    // Try each of the four orientations. Clockwise rotation:
    // new[r][c] = old[n-1-c][r].
    bool findRotation(vector<vector<int>> &mat, vector<vector<int>> &target) {
        int n = mat.size();
        vector<vector<int>> cur = mat;
        for (int t = 0; t < 4; t++) {
            if (cur == target)
                return true;
            vector<vector<int>> nxt(n, vector<int>(n));
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    nxt[r][c] = cur[n - 1 - c][r];
                }
            }
            cur = move(nxt);
        }
        return false;
    }
};
