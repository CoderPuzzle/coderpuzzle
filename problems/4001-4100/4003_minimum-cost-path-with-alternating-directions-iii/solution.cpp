class Solution {
  public:
    long long minCost(int m, int n, vector<vector<int>> &penalty) {
        const long long INF = LLONG_MAX;
        int size = m * n;
        vector<array<long long, 2>> dist(size, {INF, INF});
        dist[0][0] = 1; // entrance cost of (0, 0); next action is odd
        priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>,
                       greater<tuple<long long, int, int>>>
            pq;
        pq.push({1, 0, 0});
        int target = size - 1;
        int di[] = {1, -1, 0, 0};
        int dj[] = {0, 0, 1, -1};
        while (!pq.empty()) {
            auto [cost, cell, parity] = pq.top();
            pq.pop();
            if (cost > dist[cell][parity])
                continue;
            if (cell == target)
                continue;
            int i = cell / n, j = cell % n;
            bool isOdd = parity == 0;
            for (int t = 0; t < 4; t++) {
                int ni = i + di[t], nj = j + dj[t];
                if (!(ni >= 0 && ni < m && nj >= 0 && nj < n))
                    continue;
                bool follows = (isOdd && di[t] + dj[t] > 0) || (!isOdd && di[t] + dj[t] < 0);
                long long w = (long long)(ni + 1) * (nj + 1);
                if (!follows)
                    w += penalty[i][j];
                int ncell = ni * n + nj;
                int nparity = 1 - parity;
                long long nc = cost + w;
                if (nc < dist[ncell][nparity]) {
                    dist[ncell][nparity] = nc;
                    pq.push({nc, ncell, nparity});
                }
            }
            // wait flips parity at cost penalty[i][j]
            long long w = penalty[i][j];
            int nparity = 1 - parity;
            long long nc = cost + w;
            if (nc < dist[cell][nparity]) {
                dist[cell][nparity] = nc;
                pq.push({nc, cell, nparity});
            }
        }
        return min(dist[target][0], dist[target][1]);
    }
};
