#include <cstdint>
#include <queue>
#include <utility>
#include <vector>

class Graph {
  public:
    Graph(int n, vector<vector<int>> edges) : adjacency(n) {
        // Edges are only appended, never removed or reweighted, so a
        // plain adjacency list never needs invalidating or rebuilding.
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back({edge[1], edge[2]});
        }
    }

    void addEdge(vector<int> edge) { adjacency[edge[0]].push_back({edge[1], edge[2]}); }

    int shortestPath(int node1, int node2) {
        if (node1 == node2) {
            return 0;
        }
        // Every cost is positive, so Dijkstra applies: the min-heap
        // hands out nodes in settle order by tentative distance. Longs
        // keep the INT64_MAX sentinel arithmetic clean.
        vector<int64_t> distance(adjacency.size(), INT64_MAX);
        distance[node1] = 0;
        priority_queue<pair<int64_t, int>, vector<pair<int64_t, int>>, greater<>> heap;
        heap.push({0, node1});
        while (!heap.empty()) {
            auto [soFar, node] = heap.top();
            heap.pop();
            // Stale entry: the node was already settled through a
            // cheaper route, so skip it.
            if (soFar > distance[node]) {
                continue;
            }
            // Popping node2 settles it, so its distance is final here.
            if (node == node2) {
                return (int)soFar;
            }
            for (const auto &edge : adjacency[node]) {
                int64_t candidate = soFar + edge.second;
                // Only improving relaxations push a fresh entry, so any
                // entry goes stale at most once.
                if (candidate < distance[edge.first]) {
                    distance[edge.first] = candidate;
                    heap.push({candidate, edge.first});
                }
            }
        }
        return -1;
    }

  private:
    vector<vector<pair<int, int>>> adjacency;
};
