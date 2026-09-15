#include <queue>
#include <vector>

class Solution {
  public:
    int minFlips(std::vector<std::vector<int>> &mat) {
        // Pack the matrix into one integer; flipping cell i XORs the state
        // with its cross-shaped flip mask. Order never matters and flipping
        // a cell twice cancels, so the reachable states form one graph per
        // start state and BFS over it gives the minimum step count.
        int m = mat.size();
        int n = mat[0].size();
        int start = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (mat[r][c]) {
                    start |= 1 << (r * n + c);
                }
            }
        }
        if (start == 0) {
            return 0;
        }
        std::vector<int> masks(m * n);
        const int deltas[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int mask = 1 << (r * n + c);
                for (const auto &d : deltas) {
                    int nr = r + d[0];
                    int nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                        mask |= 1 << (nr * n + nc);
                    }
                }
                masks[r * n + c] = mask;
            }
        }
        std::vector<char> seen(1u << (m * n), 0);
        std::queue<int> frontier;
        frontier.push(start);
        seen[start] = 1;
        int steps = 0;
        while (!frontier.empty()) {
            steps++;
            int level = frontier.size();
            for (int i = 0; i < level; i++) {
                int state = frontier.front();
                frontier.pop();
                for (int mask : masks) {
                    int nstate = state ^ mask;
                    if (nstate == 0) {
                        return steps;
                    }
                    if (!seen[nstate]) {
                        seen[nstate] = 1;
                        frontier.push(nstate);
                    }
                }
            }
        }
        return -1;
    }
};
