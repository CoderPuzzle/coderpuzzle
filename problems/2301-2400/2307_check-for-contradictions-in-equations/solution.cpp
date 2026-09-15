class Solution {
  public:
    bool checkContradictions(vector<vector<string>> &equations, vector<double> &values) {
        const double EPS = 1e-5;
        unordered_map<string, int> id;
        int cap = (int)equations.size() * 2;
        vector<int> parent(cap);
        vector<double> weight(cap, 1.0);
        for (int i = 0; i < cap; i++)
            parent[i] = i;

        auto getId = [&](const string &s) {
            auto it = id.find(s);
            if (it != id.end())
                return it->second;
            int fresh = (int)id.size();
            id.emplace(s, fresh);
            parent[fresh] = fresh;
            weight[fresh] = 1.0;
            return fresh;
        };

        // returns (root, x / root)
        function<pair<int, double>(int)> find = [&](int x) -> pair<int, double> {
            if (parent[x] == x)
                return {x, 1.0};
            auto [root, w] = find(parent[x]);
            parent[x] = root;
            weight[x] *= w;
            return {root, weight[x]};
        };

        for (size_t i = 0; i < equations.size(); i++) {
            int a = getId(equations[i][0]);
            int b = getId(equations[i][1]);
            double w = values[i];
            auto [rootA, wa] = find(a);
            auto [rootB, wb] = find(b);
            if (rootA == rootB) {
                if (fabs(wa / wb - w) > EPS)
                    return true;
            } else {
                parent[rootA] = rootB;
                weight[rootA] = wb * w / wa;
            }
        }
        return false;
    }
};
