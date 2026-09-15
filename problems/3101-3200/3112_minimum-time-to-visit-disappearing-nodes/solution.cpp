#include <functional>
#include <queue>
#include <utility>
#include <vector>

class Solution {
  public:
    vector<int> minimumTime(int n, vector<vector<int>> &edges, vector<int> &disappear) {
        // Dijkstra from node 0 with one extra rule: arriving at or after a
        // node's disappearance instant means it was never visited, so such a
        // settlement propagates nothing onward either. Every settled distance
        // is < 10^5 and every pushed candidate < 2 * 10^5, so ints carry all.
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }
        const int BIG = 1 << 29;
        vector<int> dist(n, BIG);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> heap;
        dist[0] = 0;
        heap.push({0, 0});
        while (!heap.empty()) {
            auto [d, u] = heap.top();
            heap.pop();
            if (d != dist[u])
                continue; // stale entry
            if (d >= disappear[u])
                continue; // gone on arrival; cannot be visited
            for (auto &[v, w] : adj[u]) {
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    heap.push({d + w, v});
                }
            }
        }
        vector<int> answer(n);
        for (int i = 0; i < n; ++i)
            answer[i] = dist[i] < disappear[i] ? dist[i] : -1;
        return answer;
    }
};
