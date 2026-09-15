class Solution {
  public:
    vector<int> shortestDistanceColor(vector<int> &colors, vector<vector<int>> &queries) {
        const int INF = INT_MAX;
        int n = colors.size();
        // dist[i][c]: distance from i to nearest color c (1..3).
        vector<array<int, 4>> dist(n);
        for (int c = 1; c <= 3; c++) {
            // Left-to-right sweep carrying the distance to the most
            // recent occurrence of c.
            int last = INF;
            for (int i = 0; i < n; i++) {
                if (colors[i] == c) {
                    last = 0;
                } else if (last != INF) {
                    last++;
                }
                dist[i][c] = last;
            }
            // Mirror sweep keeps whichever side owns the closer one.
            last = INF;
            for (int i = n - 1; i >= 0; i--) {
                if (colors[i] == c) {
                    last = 0;
                } else if (last != INF) {
                    last++;
                }
                if (last < dist[i][c]) {
                    dist[i][c] = last;
                }
            }
        }
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int d = dist[query[0]][query[1]];
            answer.push_back(d == INF ? -1 : d);
        }
        return answer;
    }
};
