class Solution {
  public:
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>> &queries) {
        // nxt[i] is the next hop from city i on the maintained route. A
        // road (u, v) helps only when u is still on the route and it jumps
        // past nxt[u]; splicing it in retires each leapfrogged city.
        // Retired cities never return, so total work stays linear.
        vector<int> nxt(n - 1);
        for (int i = 1; i < n; i++)
            nxt[i - 1] = i;
        int count = n - 1;
        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            int u = query[0], v = query[1];
            int j = nxt[u];
            if (j > 0 && j < v) {
                while (j < v) {
                    count--;
                    int t = nxt[j];
                    nxt[j] = 0;
                    j = t;
                }
                nxt[u] = v;
            }
            answer.push_back(count);
        }
        return answer;
    }
};
