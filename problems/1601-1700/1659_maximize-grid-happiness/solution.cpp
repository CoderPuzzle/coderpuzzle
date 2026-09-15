class Solution {
  public:
    int getMaxGridHappiness(int m, int n, int introvertsCount, int extrovertsCount) {
        // Fill the grid cell by cell, row-major, and charge every bond when
        // its second member is placed: a newcomer of type v pays its own
        // base (120 for an introvert, 40 for an extrovert) plus, for each
        // of the two neighbours possibly already placed (left, above), both
        // sides of that bond at once — -60 for two introverts, +40 for two
        // extroverts, -10 for a mixed pair. The future only needs the
        // occupancy of the last n filled cells, held as one ternary mask
        // whose trit 0 is the left neighbour and trit n-1 the neighbour
        // above, plus the two budgets left. Every state value stays
        // non-negative (an introvert surrounded on all four sides still
        // nets 0), so -1 cleanly marks unreachable states.
        int width = 1;
        for (int i = 0; i < n; ++i) {
            width *= 3;
        }
        int span = width / 3;
        const int pair[3][3] = {{0, 0, 0}, {0, -60, -10}, {0, -10, 40}};
        const int base[3] = {0, 120, 40};
        auto fresh = [&]() { return vector<vector<vector<int>>>(width, vector<vector<int>>(7, vector<int>(7, -1))); };
        auto dp = fresh();
        dp[0][introvertsCount][extrovertsCount] = 0;
        for (int cell = 0; cell < m * n; ++cell) {
            bool hasLeft = cell % n != 0;
            bool hasUp = cell >= n;
            auto nxt = fresh();
            for (int mask = 0; mask < width; ++mask) {
                int left = hasLeft ? mask % 3 : 0;
                int up = hasUp ? (mask / span) % 3 : 0;
                int shifted = (mask % span) * 3;
                for (int i = 0; i < 7; ++i) {
                    for (int e = 0; e < 7; ++e) {
                        int best = dp[mask][i][e];
                        if (best < 0) {
                            continue;
                        }
                        for (int v = 0; v <= 2; ++v) {
                            if ((v == 1 && i == 0) || (v == 2 && e == 0)) {
                                continue;
                            }
                            int gain = base[v];
                            if (left != 0) {
                                gain += pair[v][left];
                            }
                            if (up != 0) {
                                gain += pair[v][up];
                            }
                            int ni = i - (v == 1);
                            int ne = e - (v == 2);
                            if (best + gain > nxt[shifted + v][ni][ne]) {
                                nxt[shifted + v][ni][ne] = best + gain;
                            }
                        }
                    }
                }
            }
            dp = move(nxt);
        }
        int answer = 0;
        for (const auto &plane : dp) {
            for (const auto &row : plane) {
                for (int value : row) {
                    answer = max(answer, value);
                }
            }
        }
        return answer;
    }
};
