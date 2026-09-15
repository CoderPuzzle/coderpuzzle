class Solution {
  public:
    int minCost(int n, vector<vector<int>> &edges) {
        // Every edge (u, v, w) also contributes the single-move reversal
        // v -> u at 2 * w: standing at v, flip v's unused switch on the
        // incoming edge u -> v. Weights are positive, so an optimal trip is
        // a simple path and flips at most one switch per node anyway.
        vector<vector<pair<int, int>>> graph(n);
        for (const auto &edge : edges) {
            graph[edge[0]].push_back({edge[1], edge[2]});
            graph[edge[1]].push_back({edge[0], 2 * edge[2]});
        }

        // Dijkstra from node 0; weights are positive, so each pop finalizes.
        const long long infinity = numeric_limits<long long>::max();
        vector<long long> distances(n, infinity);
        distances[0] = 0;
        using State = pair<long long, int>;
        priority_queue<State, vector<State>, greater<State>> heap;
        heap.push({0, 0});
        while (!heap.empty()) {
            auto [distance, node] = heap.top();
            heap.pop();
            if (distance != distances[node]) {
                continue; // stale entry; the node was finalized earlier
            }
            for (auto [neighbor, weight] : graph[node]) {
                long long candidate = distance + weight;
                if (candidate < distances[neighbor]) {
                    distances[neighbor] = candidate;
                    heap.push({candidate, neighbor});
                }
            }
        }

        // An unreached target keeps the infinity sentinel.
        long long best = distances[n - 1];
        return best == infinity ? -1 : static_cast<int>(best);
    }
};
