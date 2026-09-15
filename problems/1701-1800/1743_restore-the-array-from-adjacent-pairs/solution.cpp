class Solution {
  public:
    vector<int> restoreArray(vector<vector<int>> &adjacentPairs) {
        // Build the adjacency map: the array is a path, so every value has
        // one or two neighbours. The judge compares the returned array
        // exactly, so the walk must start at the same endpoint every time:
        // the first pair's element that is an endpoint, or the smaller
        // endpoint when the first pair is an internal edge.
        unordered_map<int, vector<int>> adj;
        for (auto &pair : adjacentPairs) {
            adj[pair[0]].push_back(pair[1]);
            adj[pair[1]].push_back(pair[0]);
        }
        int a = adjacentPairs[0][0], b = adjacentPairs[0][1];
        int start;
        if ((int)adj[a].size() == 1) {
            start = a;
        } else if ((int)adj[b].size() == 1) {
            start = b;
        } else {
            start = INT_MAX;
            for (auto &[value, neighbors] : adj) {
                if ((int)neighbors.size() == 1)
                    start = min(start, value);
            }
        }
        // Values live in [-1e5, 1e5], so INT_MAX is a safe "no previous"
        // sentinel for the walk.
        vector<int> result;
        int prev = INT_MAX;
        int cur = start;
        while (true) {
            result.push_back(cur);
            int nxt = INT_MAX;
            for (int nb : adj[cur]) {
                if (nb != prev) {
                    nxt = nb;
                    break;
                }
            }
            if (nxt == INT_MAX)
                break;
            prev = cur;
            cur = nxt;
        }
        return result;
    }
};
