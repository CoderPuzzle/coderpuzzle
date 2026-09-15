class Solution {
  public:
    int countLatticePoints(vector<vector<int>> &circles) {
        const int N = 201;
        static bool covered[N][N];
        memset(covered, 0, sizeof(covered));
        for (auto &circle : circles) {
            int x = circle[0], y = circle[1], r = circle[2];
            for (int px = x - r; px <= x + r; px++) {
                for (int py = y - r; py <= y + r; py++) {
                    long long dx = px - x, dy = py - y;
                    if (dx * dx + dy * dy <= (long long)r * r) {
                        covered[px][py] = true;
                    }
                }
            }
        }
        int count = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                count += covered[i][j];
            }
        }
        return count;
    }
};
