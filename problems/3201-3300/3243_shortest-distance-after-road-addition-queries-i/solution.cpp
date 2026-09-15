class Solution {
  public:
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>> &queries) {
        // Every added road can only shorten paths, so nothing computed for
        // an earlier query stays reusable except the road set itself. Keep
        // an adjacency list, append each new road, then run one unweighted
        // BFS from city 0 that stops as soon as city n - 1 is settled.
        // With n, q <= 500 this recomputation per query is cheap and exact.
        vector<vector<int>> roads(n);
        for (int i = 0; i + 1 < n; i++)
            roads[i].push_back(i + 1);
        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            roads[query[0]].push_back(query[1]);
            vector<int> dist(n, -1);
            vector<int> queue = {0};
            dist[0] = 0;
            for (size_t head = 0; head < queue.size(); head++) {
                int node = queue[head];
                if (node == n - 1)
                    break;
                for (int nxt : roads[node]) {
                    if (dist[nxt] == -1) {
                        dist[nxt] = dist[node] + 1;
                        queue.push_back(nxt);
                    }
                }
            }
            answer.push_back(dist[n - 1]);
        }
        return answer;
    }
};
