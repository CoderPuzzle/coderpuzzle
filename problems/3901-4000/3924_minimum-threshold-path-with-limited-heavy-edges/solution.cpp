#include <algorithm>
#include <deque>
#include <tuple>
#include <vector>

using namespace std;

class Solution {
  public:
    int minimumThreshold(int n, vector<vector<int>> &edges, int source, int target, int k) {
        if (source == target)
            return 0;
        vector<vector<pair<int, int>>> graph(n);
        int high = 0;
        for (auto &edge : edges) {
            graph[edge[0]].push_back({edge[1], edge[2]});
            graph[edge[1]].push_back({edge[0], edge[2]});
            high = max(high, edge[2]);
        }
        auto feasible = [&](int threshold) {
            vector<int> distance(n, k + 1);
            deque<int> queue;
            distance[source] = 0;
            queue.push_back(source);
            while (!queue.empty()) {
                int node = queue.front();
                queue.pop_front();
                for (auto [neighbor, weight] : graph[node]) {
                    int cost = weight > threshold;
                    int candidate = distance[node] + cost;
                    if (candidate < distance[neighbor] && candidate <= k) {
                        distance[neighbor] = candidate;
                        if (cost == 0)
                            queue.push_front(neighbor);
                        else
                            queue.push_back(neighbor);
                    }
                }
            }
            return distance[target] <= k;
        };
        if (!feasible(high))
            return -1;
        int low = 0;
        while (low < high) {
            int middle = low + (high - low) / 2;
            if (feasible(middle))
                high = middle;
            else
                low = middle + 1;
        }
        return low;
    }
};
