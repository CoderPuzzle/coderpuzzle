class Solution {
  public:
    double maxProbability(int n, vector<vector<int>> &edges, vector<double> &succProb, int start_node, int end_node) {
        vector<vector<pair<int, double>>> adjacency(n);
        for (size_t i = 0; i < edges.size(); ++i) {
            int a = edges[i][0];
            int b = edges[i][1];
            double probability = succProb[i];
            adjacency[a].push_back({b, probability});
            adjacency[b].push_back({a, probability});
        }

        vector<double> best(n, 0.0);
        best[start_node] = 1.0;
        vector<bool> visited(n, false);
        // Max-heap of (probability, node), highest probability first.
        priority_queue<pair<double, int>> heap;
        heap.push({1.0, start_node});
        while (!heap.empty()) {
            auto [probability, node] = heap.top();
            heap.pop();
            if (visited[node])
                continue;
            visited[node] = true;
            if (node == end_node)
                return probability;
            for (auto &[neighbor, edgeProbability] : adjacency[node]) {
                double candidate = probability * edgeProbability;
                if (candidate > best[neighbor]) {
                    best[neighbor] = candidate;
                    heap.push({candidate, neighbor});
                }
            }
        }
        return best[end_node];
    }
};
