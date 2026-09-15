class Solution {
  public:
    string findSpecialNodes(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // First sweep from node 0: one side's diameter endpoints. Any member
        // of that set is itself an endpoint, so the second sweep's farthest
        // nodes are the opposite endpoints.
        vector<char> oneEnd = bfs(n, adj, 0);
        int first = 0;
        for (int i = 0; i < n; i++) {
            if (oneEnd[i]) {
                first = i;
                break;
            }
        }
        vector<char> otherEnd = bfs(n, adj, first);

        // The union of the two endpoint sets is exactly the special nodes.
        string res(n, '0');
        for (int i = 0; i < n; i++) {
            if (oneEnd[i] || otherEnd[i]) {
                res[i] = '1';
            }
        }
        return res;
    }

  private:
    // Classic property: every node tying as farthest from src is the endpoint
    // of some diameter path, so the sweep marks the whole farthest set.
    vector<char> bfs(int n, vector<vector<int>> &adj, int src) {
        vector<int> dist(n, -1);
        vector<int> queue;
        queue.reserve(n);
        dist[src] = 0;
        queue.push_back(src);
        int far = 0;
        for (int head = 0; head < (int)queue.size(); head++) {
            int u = queue[head];
            for (int v : adj[u]) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    far = max(far, dist[v]);
                    queue.push_back(v);
                }
            }
        }
        vector<char> res(n, 0);
        for (int i = 0; i < n; i++) {
            res[i] = dist[i] == far;
        }
        return res;
    }
};
