class Solution {
  public:
    vector<double> calcEquation(vector<vector<string>> &equations, vector<double> &values,
                                vector<vector<string>> &queries) {
        // node -> adjacency list of (neighbor, weight) in insertion order;
        // re-adding an edge overwrites its weight in place (like Python dict).
        unordered_map<string, vector<pair<string, double>>> graph;
        auto addEdge = [&](const string &a, const string &b, double w) {
            auto &adj = graph[a];
            for (auto &edge : adj) {
                if (edge.first == b) {
                    edge.second = w;
                    return;
                }
            }
            adj.emplace_back(b, w);
        };
        // Each equation a/b = v becomes a directed edge a -> b of weight v
        // plus the reverse edge of weight 1/v (division inverts with direction).
        for (size_t i = 0; i < equations.size(); i++) {
            const string &a = equations[i][0];
            const string &b = equations[i][1];
            addEdge(a, b, values[i]);
            addEdge(b, a, 1.0 / values[i]);
        }

        vector<double> result;
        result.reserve(queries.size());
        for (auto &q : queries) {
            result.push_back(query(graph, q[0], q[1]));
        }
        return result;
    }

  private:
    double query(unordered_map<string, vector<pair<string, double>>> &graph, const string &start, const string &end) {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if (graph.find(start) == graph.end() || graph.find(end) == graph.end())
            return -1.0;
        if (start == end)
            return 1.0;
        // BFS carrying the running product: weights along the path telescope
        // to start / end because intermediate variables cancel.
        unordered_set<string> seen;
        seen.insert(start);
        deque<pair<string, double>> queue;
        queue.emplace_back(start, 1.0);
        while (!queue.empty()) {
            auto [node, product] = queue.front();
            queue.pop_front();
            for (auto &[neighbor, weight] : graph[node]) {
                if (neighbor == end) {
                    // Equations are consistent, so the first path found
                    // already yields the correct quotient.
                    return product * weight;
                }
                if (seen.find(neighbor) == seen.end()) {
                    seen.insert(neighbor);
                    queue.emplace_back(neighbor, product * weight);
                }
            }
        }
        return -1.0;
    }
};
