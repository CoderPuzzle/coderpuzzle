class Solution {
  public:
    int numberOfSets(int n, int maxDistance, vector<vector<int>> &roads) {
        // n <= 10, so every closing set fits in a bitmask. Seed one matrix
        // with the minimum weight per pair (multiple roads are allowed); for
        // each candidate mask copy it and relax only through branches that
        // survive — a shortest path between survivors never needs a closed
        // intermediate. The set counts when every surviving pair is within
        // maxDistance, and leaving zero or one branch alive passes vacuously.
        const int INF = 100000000; // above any legal maxDistance; INF + INF fits
        vector<vector<int>> weight(n, vector<int>(n, INF));
        for (int branch = 0; branch < n; ++branch) {
            weight[branch][branch] = 0;
        }
        for (auto &road : roads) {
            weight[road[0]][road[1]] = min(weight[road[0]][road[1]], road[2]);
            weight[road[1]][road[0]] = weight[road[0]][road[1]];
        }
        int count = 0;
        for (int closed = 0; closed < (1 << n); ++closed) {
            auto dist = weight;
            for (int k = 0; k < n; ++k) {
                if (closed >> k & 1) {
                    continue;
                }
                for (int i = 0; i < n; ++i) {
                    int through = dist[i][k];
                    if (through >= INF) {
                        continue;
                    }
                    for (int j = 0; j < n; ++j) {
                        if (through + dist[k][j] < dist[i][j]) {
                            dist[i][j] = through + dist[k][j];
                        }
                    }
                }
            }
            bool ok = true;
            for (int i = 0; ok && i < n; ++i) {
                if (closed >> i & 1) {
                    continue;
                }
                for (int j = 0; j < n; ++j) {
                    if (!(closed >> j & 1) && dist[i][j] > maxDistance) {
                        ok = false;
                        break;
                    }
                }
            }
            if (ok) {
                ++count;
            }
        }
        return count;
    }
};
