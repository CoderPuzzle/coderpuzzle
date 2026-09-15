class Solution {
  public:
    vector<int> findBall(vector<vector<int>> &grid) {
        // Each column's ball walks alone: the board d under it deflects it
        // into the gap between columns c and c + d, and it drops through
        // only if the board on the far side of that gap points the same
        // way — a facing pair forms a V that closes the gap, a missing
        // neighbour means the gap opens into a wall, and both mean stuck.
        int m = grid.size();
        int n = grid[0].size();
        vector<int> answer(n);
        for (int ball = 0; ball < n; ++ball) {
            int c = ball;
            for (int r = 0; r < m; ++r) {
                int d = grid[r][c];
                int next = c + d;
                if (next < 0 || next >= n || grid[r][next] != d) {
                    c = -1;
                    break;
                }
                c = next;
            }
            answer[ball] = c;
        }
        return answer;
    }
};
