class Solution {
  public:
    int magnificentSets(int n, vector<vector<int>> &edges) {
        vector<vector<int>> graph(n + 1);
        for (auto &e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        vector<char> visited(n + 1, 0);
        int total = 0;

        for (int start = 1; start <= n; start++) {
            if (visited[start]) {
                continue;
            }
            // collect the connected component
            vector<int> component;
            vector<int> stack;
            visited[start] = 1;
            stack.push_back(start);
            while (!stack.empty()) {
                int u = stack.back();
                stack.pop_back();
                component.push_back(u);
                for (int v : graph[u]) {
                    if (!visited[v]) {
                        visited[v] = 1;
                        stack.push_back(v);
                    }
                }
            }

            int best = 0;
            vector<int> dist(n + 1);
            for (int source : component) {
                fill(dist.begin(), dist.end(), -1);
                dist[source] = 0;
                vector<int> queue;
                queue.push_back(source);
                int head = 0;
                int maxDepth = 0;
                bool bipartite = true;
                while (head < (int)queue.size()) {
                    int u = queue[head++];
                    for (int v : graph[u]) {
                        if (dist[v] != -1) {
                            if (dist[v] == dist[u]) {
                                bipartite = false;
                            }
                        } else {
                            dist[v] = dist[u] + 1;
                            if (dist[v] > maxDepth) {
                                maxDepth = dist[v];
                            }
                            queue.push_back(v);
                        }
                    }
                }
                if (!bipartite) {
                    return -1;
                }
                if (maxDepth > best) {
                    best = maxDepth;
                }
            }
            total += best + 1;
        }

        return total;
    }
};
