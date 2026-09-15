#include <array>
#include <functional>
#include <limits>
#include <queue>
#include <tuple>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<long long> minCost(int n, vector<int> &prices, vector<vector<int>> &roads) {
        vector<vector<array<long long, 3>>> graph(n);
        for (auto &road : roads) {
            long long loaded = 1LL * road[2] * road[3];
            graph[road[0]].push_back({road[1], road[2], loaded});
            graph[road[1]].push_back({road[0], road[2], loaded});
        }
        vector<long long> answer(n);
        for (int start = 0; start < n; ++start) {
            auto emptyDistance = dijkstra(graph, start, false);
            auto loadedDistance = dijkstra(graph, start, true);
            answer[start] = numeric_limits<long long>::max();
            for (int shop = 0; shop < n; ++shop) {
                if (emptyDistance[shop] == numeric_limits<long long>::max())
                    continue;
                answer[start] = min(answer[start], prices[shop] + emptyDistance[shop] + loadedDistance[shop]);
            }
        }
        return answer;
    }

  private:
    vector<long long> dijkstra(const vector<vector<array<long long, 3>>> &graph, int start, bool loaded) {
        const long long inf = numeric_limits<long long>::max();
        vector<long long> distance(graph.size(), inf);
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        distance[start] = 0;
        heap.push({0, start});
        while (!heap.empty()) {
            auto [current, node] = heap.top();
            heap.pop();
            if (current != distance[node])
                continue;
            for (auto edge : graph[node]) {
                int neighbor = edge[0];
                long long candidate = current + edge[loaded ? 2 : 1];
                if (candidate < distance[neighbor]) {
                    distance[neighbor] = candidate;
                    heap.push({candidate, neighbor});
                }
            }
        }
        return distance;
    }
};
