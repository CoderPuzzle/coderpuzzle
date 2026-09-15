class Solution {
  public:
    vector<int> countPairsOfConnectableServers(vector<vector<int>> &edges, int signalSpeed) {
        int n = edges.size() + 1;
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        vector<int> answer(n);

        // For each server c, flood every branch (one component per neighbor)
        // separately, counting the servers whose distance from c is divisible
        // by signalSpeed. Two paths out of c share an edge exactly when they
        // leave along the same first edge, so cross-branch pairs are exactly
        // the connectable ones; c itself sits in no branch. A parent guard
        // prevents revisits -- sufficient in a tree -- and the explicit
        // stack keeps the walk off the call stack.
        vector<array<int, 3>> stack;
        for (int c = 0; c < n; c++) {
            int total = 0, squareSum = 0;
            for (auto &[rootV, rootW] : adj[c]) {
                int count = 0;
                stack.clear();
                stack.push_back({rootV, c, rootW % signalSpeed});
                while (!stack.empty()) {
                    auto [u, parent, dist] = stack.back();
                    stack.pop_back();
                    if (dist == 0)
                        count++;
                    for (auto &[v, w] : adj[u]) {
                        if (v != parent)
                            stack.push_back({v, u, (dist + w) % signalSpeed});
                    }
                }
                total += count;
                squareSum += count * count;
            }
            // Cross-branch pairs: sum of cnt_i * cnt_j over i < j.
            answer[c] = (total * total - squareSum) / 2;
        }
        return answer;
    }
};
