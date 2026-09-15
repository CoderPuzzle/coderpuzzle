class Solution {
  public:
    int specialNodes(int n, vector<vector<int>> &edges, int x, int y, int z) {
        vector<vector<int>> adjacency(n);
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }

        const vector<int> dx = distances(adjacency, x, n);
        const vector<int> dy = distances(adjacency, y, n);
        const vector<int> dz = distances(adjacency, z, n);

        int answer = 0;
        for (int node = 0; node < n; node++) {
            int a = dx[node];
            int b = dy[node];
            int c = dz[node];
            int swap;
            if (a > b) {
                swap = a;
                a = b;
                b = swap;
            }
            if (b > c) {
                swap = b;
                b = c;
                c = swap;
            }
            if (a > b) {
                swap = a;
                a = b;
                b = swap;
            }
            // Distances reach 10^5, so squares reach 10^10: compare in
            // long long.
            if ((long long)a * a + (long long)b * b == (long long)c * c) {
                answer++;
            }
        }
        return answer;
    }

  private:
    // Every tree edge has unit weight, so a breadth-first search from a
    // target reaches nodes in increasing distance order. The explicit
    // frontier vector keeps a 10^5-node path off the call stack.
    vector<int> distances(const vector<vector<int>> &adjacency, int source, int n) {
        vector<int> dist(n, -1);
        dist[source] = 0;
        vector<int> frontier;
        frontier.reserve(n);
        frontier.push_back(source);
        for (size_t index = 0; index < frontier.size(); index++) {
            int node = frontier[index];
            for (int neighbor : adjacency[node]) {
                if (dist[neighbor] < 0) {
                    dist[neighbor] = dist[node] + 1;
                    frontier.push_back(neighbor);
                }
            }
        }
        return dist;
    }
};
