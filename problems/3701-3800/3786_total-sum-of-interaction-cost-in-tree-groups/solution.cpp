class Solution {
  public:
    long long interactionCosts(int n, vector<vector<int>> &edges, vector<int> &group) {
        // One slot per group label; labels are 1..20.
        const int labels = 21;

        vector<vector<int>> adjacency(n);
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }

        vector<long long> total(labels, 0);
        for (int label : group) {
            ++total[label];
        }

        // Breadth-first discovery from node 0 records each node's parent;
        // an explicit queue keeps deep trees off the call stack.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (size_t index = 0; index < order.size(); index++) {
            int node = order[index];
            for (int neighbor : adjacency[node]) {
                if (neighbor != parent[node]) {
                    parent[neighbor] = node;
                    order.push_back(neighbor);
                }
            }
        }

        // counts[node * labels + label] = same-label nodes inside node's
        // subtree. Reverse discovery order visits children before parents,
        // so each node's block is complete when its turn comes.
        vector<long long> counts(n * labels, 0);
        long long answer = 0;
        for (size_t index = order.size() - 1; index >= 1; index--) {
            int node = order[index];
            int base = node * labels;
            ++counts[base + group[node]];
            int parentBase = parent[node] * labels;
            for (int label = 1; label < labels; label++) {
                long long inside = counts[base + label];
                if (inside > 0) {
                    // Every same-group pair split by the parent edge pays
                    // exactly one unit on this edge.
                    answer += inside * (total[label] - inside);
                    counts[parentBase + label] += inside;
                }
            }
        }
        return answer;
    }
};
