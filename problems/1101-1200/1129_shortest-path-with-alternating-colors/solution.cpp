class Solution {
  public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>> &redEdges, vector<vector<int>> &blueEdges) {
        // adjacency[c][u] lists endpoints of color-c edges from u.
        vector<vector<vector<int>>> adjacency(2, vector<vector<int>>(n));
        for (auto &edge : redEdges) {
            adjacency[0][edge[0]].push_back(edge[1]);
        }
        for (auto &edge : blueEdges) {
            adjacency[1][edge[0]].push_back(edge[1]);
        }

        // State = (node, color of the edge used to enter it): the same node
        // can be worth visiting once per incoming color, so BFS runs over the
        // 2n states of this expanded graph. Node 0 has no incoming edge, so
        // both colors are seeded at distance 0.
        int INF = numeric_limits<int>::max();
        vector<vector<int>> dist(n, vector<int>(2, INF));
        dist[0][0] = 0; // arrived at 0 via a red edge (virtual start)
        dist[0][1] = 0;
        vector<int> answer(n, -1);
        answer[0] = 0;
        queue<pair<int, int>> q;
        q.push({0, 0});
        q.push({0, 1});
        while (!q.empty()) {
            auto [node, color] = q.front();
            q.pop();
            // Only edges of the opposite color may leave this state; INF
            // doubles as the visited test (BFS first arrival is minimal).
            for (int nxt : adjacency[1 - color][node]) {
                if (dist[nxt][1 - color] == INF) {
                    dist[nxt][1 - color] = dist[node][color] + 1;
                    int value = dist[nxt][1 - color];
                    answer[nxt] = answer[nxt] == -1 ? value : min(answer[nxt], value);
                    q.push({nxt, 1 - color});
                }
            }
        }
        return answer;
    }
};
