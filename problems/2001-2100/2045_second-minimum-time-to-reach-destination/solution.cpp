class Solution {
  public:
    int secondMinimum(int n, vector<vector<int>> &edges, int time, int change) {
        vector<vector<int>> graph(n + 1);
        for (const vector<int> &edge : edges) {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }

        const int infinity = numeric_limits<int>::max();
        vector<int> first(n + 1, infinity);
        vector<int> second(n + 1, infinity);
        first[1] = 0;
        queue<pair<int, int>> pending;
        pending.push({1, 0});

        while (!pending.empty()) {
            auto [vertex, distance] = pending.front();
            pending.pop();
            int nextDistance = distance + 1;
            for (int neighbor : graph[vertex]) {
                if (nextDistance < first[neighbor]) {
                    second[neighbor] = first[neighbor];
                    first[neighbor] = nextDistance;
                    pending.push({neighbor, nextDistance});
                } else if (first[neighbor] < nextDistance && nextDistance < second[neighbor]) {
                    second[neighbor] = nextDistance;
                    pending.push({neighbor, nextDistance});
                }
            }
        }

        long long elapsed = 0;
        for (int step = 0; step < second[n]; ++step) {
            if ((elapsed / change) % 2 == 1) {
                elapsed = (elapsed / change + 1) * change;
            }
            elapsed += time;
        }
        return static_cast<int>(elapsed);
    }
};
