class Solution {
  public:
    int findCheapestPrice(int n, vector<vector<int>> &flights, int src, int dst, int k) {
        vector<vector<pair<int, int>>> graph(n);
        for (const auto &flight : flights) {
            graph[flight[0]].push_back({flight[1], flight[2]});
        }
        // State = (cost, node, flights taken). Carrying the count in the
        // state is what enforces the limit: a state that already used its
        // k+1 flights is never allowed to board another.
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        heap.emplace(0, src, 0);
        vector<int> best(n, INT_MAX);
        while (!heap.empty()) {
            auto [cost, node, edges] = heap.top();
            heap.pop();
            // The heap pops in cost order, so the first dst pop is final.
            if (node == dst) {
                return cost;
            }
            // Dominance prune: a cheaper state that used no more flights was
            // already expanded here, so this one cannot lead anywhere new.
            if (edges > best[node]) {
                continue;
            }
            best[node] = edges;
            if (edges < k + 1) {
                for (const auto &[nxt, price] : graph[node]) {
                    heap.emplace(cost + price, nxt, edges + 1);
                }
            }
        }
        return -1;
    }
};
