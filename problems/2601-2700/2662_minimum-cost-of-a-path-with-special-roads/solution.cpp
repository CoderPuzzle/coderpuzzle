class Solution {
  public:
    int minimumCost(vector<int> &start, vector<int> &target, vector<vector<int>> &specialRoads) {
        // By hint 1 an optimal route only ever stops at road endpoints (plus
        // start and target): any other intermediate point is dominated by
        // walking straight past it. Build that candidate set deduped, join
        // every pair with a Manhattan-priced walk, add each special road as
        // one directed edge priced at its own cost, and run Dijkstra.
        auto encode = [](long long x, long long y) { return (x << 17) | y; };
        unordered_map<long long, int> index;
        vector<pair<int, int>> points;
        auto add = [&](int x, int y) {
            long long key = encode(x, y);
            if (!index.count(key)) {
                index[key] = (int)points.size();
                points.push_back({x, y});
            }
        };
        add(start[0], start[1]);
        add(target[0], target[1]);
        for (auto &road : specialRoads) {
            add(road[0], road[1]);
            add(road[2], road[3]);
        }
        int n = (int)points.size();
        vector<array<int, 3>> roads;
        roads.reserve(specialRoads.size());
        for (auto &road : specialRoads) {
            roads.push_back({index[encode(road[0], road[1])], index[encode(road[2], road[3])], road[4]});
        }
        const int INF = INT_MAX;
        vector<int> dist(n, INF);
        vector<char> used(n, 0);
        dist[index[encode(start[0], start[1])]] = 0;
        for (int round = 0; round < n; ++round) {
            // Nearest unvisited node scan keeps the code heap-free; with at
            // most ~402 candidates the quadratic cost is negligible.
            int u = -1;
            for (int v = 0; v < n; ++v)
                if (!used[v] && (u == -1 || dist[v] < dist[u]))
                    u = v;
            if (u == -1 || dist[u] == INF)
                break;
            used[u] = 1;
            for (int v = 0; v < n; ++v) {
                if (!used[v]) {
                    int walk =
                        dist[u] + abs(points[v].first - points[u].first) + abs(points[v].second - points[u].second);
                    if (walk < dist[v])
                        dist[v] = walk;
                }
            }
            for (auto &[a, b, cost] : roads) {
                if (a == u && dist[u] + cost < dist[b])
                    dist[b] = dist[u] + cost;
            }
        }
        return dist[index[encode(target[0], target[1])]];
    }
};
