class Solution {
  public:
    int minCost(int maxTime, vector<vector<int>> &edges, vector<int> &passingFees) {
        int n = passingFees.size();
        const int INF = INT_MAX / 2;
        // Unfold the graph into layers indexed by exact arrival time:
        // layers[t][c] = min fee of any walk from city 0 arriving at c at
        // minute t exactly. Within one time layer, minimizing cost is
        // well-defined, so revisiting a city at a different time stays legal.
        vector<vector<int>> layers(maxTime + 1);
        vector<int> start(n, INF);
        start[0] = passingFees[0];
        layers[0] = start;
        for (int t = 1; t <= maxTime; ++t) {
            vector<int> cur(n, INF);
            for (auto &e : edges) {
                int x = e[0], y = e[1], dt = e[2];
                if (dt > t)
                    continue; // edge cannot fit in the elapsed time
                // Relax both directions from the layer exactly dt minutes ago.
                vector<int> &prev = layers[t - dt];
                if (prev[x] < INF && prev[x] + passingFees[y] < cur[y])
                    cur[y] = prev[x] + passingFees[y];
                if (prev[y] < INF && prev[y] + passingFees[x] < cur[x])
                    cur[x] = prev[y] + passingFees[x];
            }
            layers[t] = cur;
        }
        // Destination may be reached before maxTime: take the min over all
        // time layers; all-infinity means no feasible walk.
        int best = INF;
        for (auto &layer : layers) {
            best = min(best, layer[n - 1]);
        }
        return best < INF ? best : -1;
    }
};
