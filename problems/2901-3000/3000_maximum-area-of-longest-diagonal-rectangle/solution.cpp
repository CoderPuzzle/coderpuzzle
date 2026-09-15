class Solution {
  public:
    int areaOfMaxDiagonal(vector<vector<int>> &dimensions) {
        // Compare diagonals through their squares (l^2 + w^2): squares
        // order diagonals identically and stay exact in integers, so no
        // square roots or float rounding anywhere. Ties on the diagonal
        // fall through to the larger area.
        int bestDiag = 0;
        int bestArea = 0;
        for (const auto &rect : dimensions) {
            int diag = rect[0] * rect[0] + rect[1] * rect[1];
            int area = rect[0] * rect[1];
            if (diag > bestDiag || (diag == bestDiag && area > bestArea)) {
                bestDiag = diag;
                bestArea = area;
            }
        }
        return bestArea;
    }
};
