class Solution {
  public:
    int minNumberOfSemesters(int n, vector<vector<int>> &relations, int k) {
        // prereq[i] = bitmask of courses that must precede course i.
        vector<int> prereq(n, 0);
        for (auto &relation : relations) {
            prereq[relation[1] - 1] |= 1 << (relation[0] - 1);
        }
        int full = (1 << n) - 1;
        // dp[mask] = min semesters to have taken exactly the courses in mask.
        // Every transition only adds bits, so the target mask is numerically
        // larger — increasing order finalizes every predecessor first.
        // The n+1 sentinel parks unreachable states.
        const int unreachable = n + 1;
        vector<int> dp(full + 1, unreachable);
        dp[0] = 0;
        vector<int> bits;
        bits.reserve(n);
        for (int mask = 0; mask < full; mask++) {
            if (dp[mask] == unreachable) {
                continue;
            }
            // Available = untaken courses whose prerequisite set already sits
            // inside mask (one AND per course).
            int avail = 0;
            for (int course = 0; course < n; course++) {
                if (!(mask >> course & 1) && (prereq[course] & ~mask) == 0) {
                    avail |= 1 << course;
                }
            }
            if (!avail) {
                continue;
            }
            bits.clear();
            for (int course = 0; course < n; course++) {
                if (avail >> course & 1) {
                    bits.push_back(course);
                }
            }
            // Fewer than k available: take them all in a single semester.
            if ((int)bits.size() <= k) {
                relax(mask | avail, dp[mask] + 1, dp);
            } else {
                // Taking an extra available course never hurts, so only
                // semesters that take exactly k courses need examining.
                choose(bits, 0, k, mask, dp[mask], dp);
            }
        }
        return dp[full];
    }

  private:
    static void relax(int state, int candidate, vector<int> &dp) {
        if (candidate < dp[state]) {
            dp[state] = candidate;
        }
    }

    // Enumerate every exactly-need-sized subset of bits[start..] by recursion.
    static void choose(const vector<int> &bits, int start, int need, int taken, int steps, vector<int> &dp) {
        if (need == 0) {
            relax(taken, steps + 1, dp);
            return;
        }
        for (int i = start; i + need <= (int)bits.size(); i++) {
            choose(bits, i + 1, need - 1, taken | (1 << bits[i]), steps, dp);
        }
    }
};
