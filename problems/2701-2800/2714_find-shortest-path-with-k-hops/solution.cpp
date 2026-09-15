#include <climits>
#include <queue>
#include <tuple>
#include <vector>

class Solution {
  public:
    int shortestPathWithHops(int n, vector<vector<int>> &edges, int s, int d, int k) {
        // Dijkstra over states (node, hops used): staying in a layer pays the
        // edge weight, a hop crosses into the next layer for free; node d pops
        // at the minimum over every way of spending at most k free edges.
        vector<vector<pair<int, int>>> adjacency(n);
        for (const vector<int> &edge : edges) {
            adjacency[edge[0]].push_back({edge[1], edge[2]});
            adjacency[edge[1]].push_back({edge[0], edge[2]});
        }
        vector<vector<int>> best(n, vector<int>(k + 1, INT_MAX));
        best[s][0] = 0;
        // Min-heap of (distance, node, hops used), smallest distance first.
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> heap;
        heap.push({0, s, 0});
        while (!heap.empty()) {
            auto [dist, node, hops] = heap.top();
            heap.pop();
            if (dist > best[node][hops])
                continue;
            if (node == d)
                return dist;
            for (auto &[neighbor, weight] : adjacency[node]) {
                int candidate = dist + weight;
                if (candidate < best[neighbor][hops]) {
                    best[neighbor][hops] = candidate;
                    heap.push({candidate, neighbor, hops});
                }
                if (hops < k && dist < best[neighbor][hops + 1]) {
                    best[neighbor][hops + 1] = dist;
                    heap.push({dist, neighbor, hops + 1});
                }
            }
        }
        throw std::logic_error("unreachable: the graph is connected");
    }
};
