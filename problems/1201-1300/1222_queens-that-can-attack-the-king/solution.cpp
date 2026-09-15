class Solution {
  public:
    vector<vector<int>> queensAttacktheKing(vector<vector<int>> &queens, vector<int> &king) {
        bool board[8][8] = {};
        for (const auto &queen : queens)
            board[queen[0]][queen[1]] = true;
        vector<vector<int>> out;
        for (int dx = -1; dx <= 1; ++dx) {
            for (int dy = -1; dy <= 1; ++dy) {
                if (dx == 0 && dy == 0)
                    continue;
                // First queen on each ray attacks; she also blocks the rest.
                int x = king[0] + dx, y = king[1] + dy;
                while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                    if (board[x][y]) {
                        out.push_back({x, y});
                        break;
                    }
                    x += dx;
                    y += dy;
                }
            }
        }
        return out;
    }
};
