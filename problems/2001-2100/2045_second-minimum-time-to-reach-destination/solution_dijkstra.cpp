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
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pending;
        pending.push({0, 1});

        while (!pending.empty()) {
            auto [distance, vertex] = pending.top();
            pending.pop();
            // stale entry: both slots improved after this was pushed
            if (distance > second[vertex]) {
                continue;
            }
            int nextDistance = distance + 1;
            for (int neighbor : graph[vertex]) {
                if (nextDistance < first[neighbor]) {
                    second[neighbor] = first[neighbor];
                    first[neighbor] = nextDistance;
                    pending.push({nextDistance, neighbor});
                } else if (first[neighbor] < nextDistance && nextDistance < second[neighbor]) {
                    second[neighbor] = nextDistance;
                    pending.push({nextDistance, neighbor});
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
