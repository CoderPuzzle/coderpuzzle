class Solution {
  public:
    int networkBecomesIdle(vector<vector<int>> &edges, vector<int> &patience) {
        vector<vector<int>> graph(patience.size());
        for (const auto &edge : edges) {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }

        vector<int> distance(patience.size(), -1);
        distance[0] = 0;
        queue<int> pending;
        pending.push(0);
        while (!pending.empty()) {
            int node = pending.front();
            pending.pop();
            for (int neighbor : graph[node]) {
                if (distance[neighbor] == -1) {
                    distance[neighbor] = distance[node] + 1;
                    pending.push(neighbor);
                }
            }
        }

        long long lastArrival = 0;
        for (int server = 1; server < static_cast<int>(patience.size()); ++server) {
            long long roundTrip = 2LL * distance[server];
            long long lastSend = ((roundTrip - 1) / patience[server]) * patience[server];
            lastArrival = max(lastArrival, lastSend + roundTrip);
        }
        return static_cast<int>(lastArrival + 1);
    }
};
