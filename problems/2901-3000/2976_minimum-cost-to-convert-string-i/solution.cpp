class Solution {
  public:
    long long minimumCost(string source, string target, vector<string> &original, vector<string> &changed,
                          vector<int> &cost) {
        // A conversion rule is a directed edge in the 26-letter cost graph;
        // the cheapest a->b conversion is the shortest path a->b.
        const long long INF = LLONG_MAX / 4;
        vector<vector<long long>> dist(26, vector<long long>(26, INF));
        for (int i = 0; i < 26; i++)
            dist[i][i] = 0;
        for (int e = 0; e < (int)original.size(); e++) {
            int a = original[e][0] - 'a';
            int b = changed[e][0] - 'a';
            // Duplicate rules for the same pair just keep the minimum cost.
            if (cost[e] < dist[a][b])
                dist[a][b] = cost[e];
        }
        // Floyd–Warshall: relax every pair through each intermediate letter.
        for (int m = 0; m < 26; m++) {
            const vector<long long> &row = dist[m];
            for (int i = 0; i < 26; i++) {
                vector<long long> &di = dist[i];
                long long dim = di[m];
                if (dim == INF)
                    continue;
                for (int j = 0; j < 26; j++) {
                    long long nd = dim + row[j];
                    if (nd < di[j])
                        di[j] = nd;
                }
            }
        }
        // Matching characters convert for free; one unreachable pair fails all.
        long long total = 0;
        int len = (int)source.size();
        for (int p = 0; p < len; p++) {
            int s = source[p] - 'a';
            int t = target[p] - 'a';
            if (s == t)
                continue;
            long long d = dist[s][t];
            if (d == INF)
                return -1;
            total += d;
        }
        return total;
    }
};
