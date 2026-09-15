#include <array>
#include <climits>
#include <queue>
#include <tuple>
#include <vector>

class Solution {
  public:
    long long minCostExcludingMax(int n, vector<vector<int>> &edges) {
        // Excluding the first maximum-weight edge of a path equals
        // excluding any one designated edge (both give sum - maxweight),
        // so Dijkstra runs over states (node, excluded): staying in a
        // layer pays the edge weight, crossing layers excludes exactly one
        // edge for free. A path cost can reach (n - 1) * 5 * 10^4 ~ 2.5 *
        // 10^9, past 32 bits, so distances ride in long long.
        vector<vector<pair<int, int>>> adjacency(n);
        for (const vector<int> &edge : edges) {
            adjacency[edge[0]].push_back({edge[1], edge[2]});
            adjacency[edge[1]].push_back({edge[0], edge[2]});
        }
        vector<array<long long, 2>> best(n, {LLONG_MAX, LLONG_MAX});
        best[0][0] = 0;
        // Min-heap of (distance, node, excluded flag), smallest first.
        priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<>> heap;
        heap.push({0, 0, 0});
        while (!heap.empty()) {
            auto [dist, node, used] = heap.top();
            heap.pop();
            if (dist > best[node][used])
                continue;
            if (node == n - 1 && used == 1)
                return dist;
            for (auto &[neighbor, weight] : adjacency[node]) {
                long long candidate = dist + weight;
                if (candidate < best[neighbor][used]) {
                    best[neighbor][used] = candidate;
                    heap.push({candidate, neighbor, used});
                }
                if (used == 0 && dist < best[neighbor][1]) {
                    best[neighbor][1] = dist;
                    heap.push({dist, neighbor, 1});
                }
            }
        }
        throw std::logic_error("unreachable: the graph is connected");
    }
};
