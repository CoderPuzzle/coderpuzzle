#include <algorithm>
#include <functional>
#include <queue>
#include <utility>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<vector<int>> modifiedGraphEdges(int n, vector<vector<int>> &edges, int source, int destination, int target) {
        const long long kInfinity = static_cast<long long>(4e18);
        int count = static_cast<int>(edges.size());

        // Weights <= 0 are skipped, so passing the raw list treats every -1
        // edge as absent, while passing the working copy gives the current
        // assignment.
        auto dijkstra = [&](const vector<long long> &weights, int start) {
            vector<vector<pair<int, long long>>> graph(n);
            for (int index = 0; index < count; ++index) {
                if (weights[index] <= 0)
                    continue;
                graph[edges[index][0]].push_back({edges[index][1], weights[index]});
                graph[edges[index][1]].push_back({edges[index][0], weights[index]});
            }

            vector<long long> distance(n, kInfinity);
            distance[start] = 0;
            priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> queue;
            queue.push({0, start});
            while (!queue.empty()) {
                auto [dist, node] = queue.top();
                queue.pop();
                if (dist > distance[node])
                    continue;
                for (auto &[neighbor, weight] : graph[node]) {
                    long long candidate = dist + weight;
                    if (candidate < distance[neighbor]) {
                        distance[neighbor] = candidate;
                        queue.push({candidate, neighbor});
                    }
                }
            }
            return distance;
        };

        vector<long long> untouched(count);
        for (int index = 0; index < count; ++index)
            untouched[index] = edges[index][2];
        if (dijkstra(untouched, source)[destination] < target)
            return {};

        vector<long long> weights(count);
        for (int index = 0; index < count; ++index)
            weights[index] = untouched[index] > 0 ? untouched[index] : 1;
        if (dijkstra(weights, source)[destination] > target)
            return {};

        while (true) {
            vector<long long> distances = dijkstra(weights, source);
            long long current = distances[destination];
            if (current == target)
                break;

            vector<long long> reverse = dijkstra(weights, destination);
            long long deficit = target - current;
            int bestIndex = -1;
            long long bestKey = kInfinity;
            for (int index = 0; index < count; ++index) {
                if (untouched[index] != -1)
                    continue;
                int u = edges[index][0];
                int v = edges[index][1];
                bool forward = distances[u] + weights[index] + reverse[v] == current;
                bool backward = distances[v] + weights[index] + reverse[u] == current;
                if (!forward && !backward)
                    continue;
                long long key = forward && backward ? min(distances[u], distances[v])
                                : forward           ? distances[u]
                                                    : distances[v];
                if (key < bestKey) {
                    bestKey = key;
                    bestIndex = index;
                }
            }
            weights[bestIndex] += deficit;
        }

        vector<vector<int>> answer(count);
        for (int index = 0; index < count; ++index) {
            answer[index] = {edges[index][0], edges[index][1], static_cast<int>(weights[index])};
        }
        return answer;
    }
};
