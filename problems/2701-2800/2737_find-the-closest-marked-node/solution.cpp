class Solution {
  public:
    long long minimumDistance(int n, vector<vector<int>> &edges, int s, vector<int> &marked) {
        // Adjacency lists over DIRECTED edges: u -> v only, never the reverse.
        // Parallel edges both enter the list; relaxation keeps the cheaper one.
        vector<vector<pair<int, int>>> graph(n);
        for (const auto &edge : edges) {
            graph[edge[0]].push_back({edge[1], edge[2]});
        }

        // Dijkstra from s; weights are positive, so each pop finalizes its node.
        const long long infinity = numeric_limits<long long>::max();
        vector<long long> distances(n, infinity);
        distances[s] = 0;
        using State = pair<long long, int>;
        priority_queue<State, vector<State>, greater<State>> heap;
        heap.push({0, s});
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

        // The answer is the closest marked node; unreachable ones stay at infinity.
        long long best = infinity;
        for (int node : marked) {
            best = min(best, distances[node]);
        }
        return best == infinity ? -1 : best;
    }
};
