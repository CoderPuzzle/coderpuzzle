#include <queue>
#include <vector>

class Solution {
  public:
    bool isPossibleToCutPath(std::vector<std::vector<int>> &grid) {
        // Only a 1->0 flip can ever help, so the game is decided by
        // vertex cuts of the monotone 1-cell DAG: at most one flip
        // succeeds exactly when fewer than two vertex-disjoint
        // corner-to-corner paths exist (Menger). Unit vertex capacities
        // come from the standard in/out split; cells off any
        // root-to-corner route are skipped outright. Augmenting BFS
        // stops early once flow 2 proves the answer false, so at most
        // two searches ever run.
        int m = static_cast<int>(grid.size());
        int n = static_cast<int>(grid[0].size());
        int count = m * n;
        int inf = count + 2;
        std::vector<int> arcs_to;
        std::vector<int> arcs_cap;
        std::vector<std::vector<int>> graph(2 * count);
        auto connect = [&](int u, int v, int cap) {
            graph[u].push_back(static_cast<int>(arcs_to.size()));
            arcs_to.push_back(v);
            arcs_cap.push_back(cap);
            graph[v].push_back(static_cast<int>(arcs_to.size()));
            arcs_to.push_back(u);
            arcs_cap.push_back(0);
        };
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0)
                    continue;
                int cell = i * n + j;
                bool corner = (i == 0 && j == 0) || (i == m - 1 && j == n - 1);
                connect(2 * cell, 2 * cell + 1, corner ? inf : 1);
                if (j + 1 < n && grid[i][j + 1] == 1)
                    connect(2 * cell + 1, 2 * (cell + 1), inf);
                if (i + 1 < m && grid[i + 1][j] == 1)
                    connect(2 * cell + 1, 2 * (cell + n), inf);
            }
        }
        int source = 0;
        int sink = 2 * (count - 1) + 1;
        int total = 0;
        while (total < 2) {
            std::vector<int> parent(2 * count, -1);
            std::vector<int> via(2 * count, -1);
            std::queue<int> queue;
            parent[source] = source;
            queue.push(source);
            while (!queue.empty() && parent[sink] == -1) {
                int u = queue.front();
                queue.pop();
                for (int e : graph[u]) {
                    if (parent[sink] != -1)
                        break;
                    int v = arcs_to[e];
                    if (arcs_cap[e] > 0 && parent[v] == -1) {
                        parent[v] = u;
                        via[v] = e;
                        queue.push(v);
                    }
                }
            }
            if (parent[sink] == -1)
                break;
            int v = sink;
            while (v != source) {
                int e = via[v];
                arcs_cap[e]--;
                arcs_cap[e ^ 1]++;
                v = parent[v];
            }
            total++;
        }
        return total < 2;
    }
};
