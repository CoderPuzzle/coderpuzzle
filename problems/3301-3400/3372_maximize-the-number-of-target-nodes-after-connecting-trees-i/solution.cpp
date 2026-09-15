class Solution {
  public:
    // answer[i] = (nodes within k of i in tree 1) + max over v of (nodes
    // within k - 1 of v in tree 2): the connecting edge spends one of the
    // k steps, and queries are independent (hints 1-2). With k = 0 the
    // k - 1 limit floors to zero second-tree nodes. Layer BFS is iterative
    // — a 1000-node path would overflow the judged stack.
    vector<vector<int>> build(const vector<vector<int>> &edges) {
        vector<vector<int>> adj(edges.size() + 1);
        for (const auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        return adj;
    }

    int within(const vector<vector<int>> &adj, int start, int limit) {
        if (limit < 0)
            return 0;
        vector<char> seen(adj.size(), 0);
        seen[start] = 1;
        int count = 1;
        vector<int> frontier = {start};
        for (int depth = 0; depth < limit && !frontier.empty(); depth++) {
            vector<int> next;
            for (int u : frontier) {
                for (int w : adj[u]) {
                    if (!seen[w]) {
                        seen[w] = 1;
                        count++;
                        next.push_back(w);
                    }
                }
            }
            frontier = move(next);
        }
        return count;
    }

    vector<int> maxTargetNodes(vector<vector<int>> &edges1, vector<vector<int>> &edges2, int k) {
        vector<vector<int>> adj1 = build(edges1), adj2 = build(edges2);
        int best2 = 0;
        for (int v = 0; v < static_cast<int>(adj2.size()); v++) {
            best2 = max(best2, within(adj2, v, k - 1));
        }
        vector<int> answer;
        answer.reserve(adj1.size());
        for (int u = 0; u < static_cast<int>(adj1.size()); u++) {
            answer.push_back(within(adj1, u, k) + best2);
        }
        return answer;
    }
};
