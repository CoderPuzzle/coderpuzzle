class Solution {
  public:
    bool checkContradictions(vector<vector<string>> &equations, vector<double> &values) {
        const double EPS = 1e-5;
        unordered_map<string, int> id;
        size_t cap = equations.size() * 2;
        vector<vector<pair<int, double>>> adj(cap);
        auto getId = [&](const string &s) {
            auto it = id.find(s);
            if (it != id.end())
                return it->second;
            int fresh = (int)id.size();
            id.emplace(s, fresh);
            return fresh;
        };

        for (size_t i = 0; i < equations.size(); i++) {
            int a = getId(equations[i][0]);
            int b = getId(equations[i][1]);
            double w = values[i];
            adj[b].push_back({a, w});
            adj[a].push_back({b, 1.0 / w});
        }

        vector<double> ratio(cap, 0.0); // 0 marks unvisited; labels are positive
        vector<int> queue;
        for (size_t root = 0; root < cap; root++) {
            if (ratio[root] != 0.0)
                continue;
            ratio[root] = 1.0;
            queue.clear();
            queue.push_back((int)root);
            for (size_t head = 0; head < queue.size(); head++) {
                int x = queue[head];
                for (auto [y, factor] : adj[x]) {
                    if (ratio[y] == 0.0) {
                        ratio[y] = ratio[x] * factor;
                        queue.push_back(y);
                    }
                }
            }
        }

        for (size_t i = 0; i < equations.size(); i++) {
            int a = getId(equations[i][0]);
            int b = getId(equations[i][1]);
            double w = values[i];
            if (fabs(ratio[a] / ratio[b] - w) > EPS)
                return true;
        }
        return false;
    }
};
