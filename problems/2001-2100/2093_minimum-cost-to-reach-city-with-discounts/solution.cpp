class Solution {
  public:
    int minimumCost(int n, vector<vector<int>> &highways, int discounts) {
        vector<vector<pair<int, int>>> graph(n);
        for (const auto &highway : highways) {
            graph[highway[0]].push_back({highway[1], highway[2]});
            graph[highway[1]].push_back({highway[0], highway[2]});
        }

        const long long infinity = numeric_limits<long long>::max();
        vector<vector<long long>> distances(n, vector<long long>(discounts + 1, infinity));
        using State = tuple<long long, int, int>;
        priority_queue<State, vector<State>, greater<State>> heap;
        distances[0][0] = 0;
        heap.push({0, 0, 0});
        while (!heap.empty()) {
            auto [cost, city, used] = heap.top();
            heap.pop();
            if (cost != distances[city][used]) {
                continue;
            }
            if (city == n - 1) {
                return static_cast<int>(cost);
            }
            for (auto [neighbor, toll] : graph[city]) {
                long long fullCost = cost + toll;
                if (fullCost < distances[neighbor][used]) {
                    distances[neighbor][used] = fullCost;
                    heap.push({fullCost, neighbor, used});
                }
                if (used < discounts) {
                    long long discountedCost = cost + toll / 2;
                    if (discountedCost < distances[neighbor][used + 1]) {
                        distances[neighbor][used + 1] = discountedCost;
                        heap.push({discountedCost, neighbor, used + 1});
                    }
                }
            }
        }
        return -1;
    }
};
