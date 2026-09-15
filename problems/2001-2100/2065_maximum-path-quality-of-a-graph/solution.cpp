class Solution {
    vector<int> *values;
    vector<vector<pair<int, int>>> graph;
    vector<int> visits;
    int maxTime;
    int best;

    void search(int node, int elapsed, int quality) {
        if (node == 0) {
            best = max(best, quality);
        }

        for (auto [neighbor, travelTime] : graph[node]) {
            int nextTime = elapsed + travelTime;
            if (nextTime > maxTime) {
                continue;
            }
            bool firstVisit = visits[neighbor] == 0;
            ++visits[neighbor];
            search(neighbor, nextTime, quality + (firstVisit ? (*values)[neighbor] : 0));
            --visits[neighbor];
        }
    }

  public:
    int maximalPathQuality(vector<int> &values, vector<vector<int>> &edges, int maxTime) {
        this->values = &values;
        this->maxTime = maxTime;
        graph.assign(values.size(), {});
        for (const auto &edge : edges) {
            graph[edge[0]].push_back({edge[1], edge[2]});
            graph[edge[1]].push_back({edge[0], edge[2]});
        }

        visits.assign(values.size(), 0);
        visits[0] = 1;
        best = values[0];
        search(0, 0, values[0]);
        return best;
    }
};
