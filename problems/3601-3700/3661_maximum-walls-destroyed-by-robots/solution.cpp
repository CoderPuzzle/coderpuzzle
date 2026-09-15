class Solution {
  public:
    int maxWalls(vector<int> &robots, vector<int> &distance, vector<int> &walls) {
        // Sort robots by position (carrying each range along) and sort the
        // wall positions once: every reachable set below is then counted
        // with two binary searches instead of a scan.
        int n = robots.size();
        vector<pair<int, int>> bots;
        bots.reserve(n);
        for (int i = 0; i < n; i++) {
            bots.push_back({robots[i], distance[i]});
        }
        sort(bots.begin(), bots.end());
        sort(walls.begin(), walls.end());
        // Interval ends reach 1e9 + 1e5 — inside int, but the arithmetic
        // below runs in long long so nothing depends on that headroom.
        auto count = [&](long long lo, long long hi) -> long long {
            // How many walls lie in the closed interval [lo, hi].
            if (lo > hi) {
                return 0;
            }
            return upper_bound(walls.begin(), walls.end(), hi) - lower_bound(walls.begin(), walls.end(), lo);
        };
        // Firing left the bullet stops at the previous robot, firing right
        // at the next one; a wall on the blocker's position survives (only
        // the blocker itself can destroy it).
        auto left_lo = [&](int i) -> long long {
            long long lo = (long long)bots[i].first - bots[i].second;
            if (i > 0) {
                lo = max(lo, (long long)bots[i - 1].first + 1);
            }
            return lo;
        };
        auto right_hi = [&](int i) -> long long {
            long long hi = (long long)bots[i].first + bots[i].second;
            if (i + 1 < n) {
                hi = min(hi, (long long)bots[i + 1].first - 1);
            }
            return hi;
        };
        // prev_left / prev_right: best totals for the robots already decided
        // when the last of them fired left / right.
        long long prev_left = count(left_lo(0), bots[0].first);
        long long prev_right = count(bots[0].first, right_hi(0));
        for (int i = 1; i < n; i++) {
            long long pos = bots[i].first;
            long long here_left = count(left_lo(i), pos);
            long long here_right = count(pos, right_hi(i));
            // Facing shots share the gap: when this robot fires left and the
            // previous one fired right, the walls both bullets reach were
            // already counted and must not count twice.
            long long shared = count(left_lo(i), min((long long)bots[i - 1].first + bots[i - 1].second, pos - 1));
            long long best = max(prev_left, prev_right);
            prev_left = max(prev_left + here_left, prev_right + here_left - shared);
            // A rightward shot can never overlap anything already decided.
            prev_right = best + here_right;
        }
        return (int)max(prev_left, prev_right);
    }
};
