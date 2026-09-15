class Solution {
  public:
    int robotSim(vector<int> &commands, vector<vector<int>> &obstacles) {
        // Replay the walk exactly as stated: the heading is an index on the
        // four cardinal directions, a turn is one step around that cycle
        // (right +1, left +3, mod 4), and a forward command is unit moves
        // that halt the whole command the moment the next cell is blocked.
        // Obstacles live in a set for constant-time membership, and the
        // answer is the largest x*x + y*y over the whole path in time, not
        // just at the final cell.
        unordered_set<long long> blocked;
        blocked.reserve(obstacles.size() * 2);
        for (const auto &obstacle : obstacles) {
            // One integer key per cell; 200003 exceeds twice the furthest
            // reachable coordinate (9 * 10^4), so distinct cells never collide.
            blocked.insert((long long)obstacle[0] * 200003 + obstacle[1]);
        }
        const int dx[4] = {0, 1, 0, -1}; // north, east, south, west
        const int dy[4] = {1, 0, -1, 0};
        int x = 0, y = 0, heading = 0;
        long long best = 0;
        for (int command : commands) {
            if (command == -2) { // turn left
                heading = (heading + 3) & 3;
            } else if (command == -1) { // turn right
                heading = (heading + 1) & 3;
            } else {
                for (int step = 0; step < command; ++step) {
                    int nx = x + dx[heading], ny = y + dy[heading];
                    if (blocked.count((long long)nx * 200003 + ny)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    best = max(best, (long long)x * x + (long long)y * y);
                }
            }
        }
        return (int)best;
    }
};
