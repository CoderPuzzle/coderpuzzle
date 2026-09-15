class Solution {
  public:
    vector<double> calcEquation(vector<vector<string>> &equations, vector<double> &values,
                                vector<vector<string>> &queries) {
        // Weighted union-find over the variable names: weight[x] always holds
        // x / parent[x], so the product along a parent chain is the member's
        // ratio to its root.
        unordered_map<string, string> parent;
        unordered_map<string, double> weight;
        unordered_map<string, int> size;
        auto add = [&](const string &node) {
            if (parent.find(node) == parent.end()) {
                parent[node] = node;
                weight[node] = 1.0;
                size[node] = 1;
            }
        };
        // Each stated ratio a / b = v becomes one merge of the two variables.
        for (size_t i = 0; i < equations.size(); i++) {
            const string &a = equations[i][0];
            const string &b = equations[i][1];
            add(a);
            add(b);
            unite(parent, weight, size, a, b, values[i]);
        }

        vector<double> result;
        result.reserve(queries.size());
        for (auto &q : queries) {
            result.push_back(query(parent, weight, q[0], q[1]));
        }
        return result;
    }

  private:
    pair<string, double> find(unordered_map<string, string> &parent, unordered_map<string, double> &weight,
                              const string &x) {
        // Walk up to the root folding the chain into one node / root product,
        // then re-hang every visited node directly on the root (path
        // compression), each stored weight becoming that product.
        string root = x;
        double product = 1.0;
        while (parent[root] != root) {
            product *= weight[root];
            root = parent[root];
        }
        string node = x;
        double quotient = product;
        while (parent[node] != root) {
            string next = parent[node];
            double step = weight[node];
            parent[node] = root;
            weight[node] = quotient;
            node = next;
            quotient /= step;
        }
        return {root, product};
    }

    void unite(unordered_map<string, string> &parent, unordered_map<string, double> &weight,
               unordered_map<string, int> &size, const string &a, const string &b, double value) {
        // Fold one stated ratio a / b = value into the forest.
        auto [rootA, ratioA] = find(parent, weight, a);
        auto [rootB, ratioB] = find(parent, weight, b);
        if (rootA == rootB) {
            // The batch never contradicts itself, so a ratio restating an
            // existing link agrees with the folded product.
            return;
        }
        // Union by size: hang the smaller tree under the larger.
        if (size[rootA] < size[rootB]) {
            swap(rootA, rootB);
            swap(ratioA, ratioB);
            value = 1.0 / value;
        }
        // a = value * b written in root terms, ratioA * rootA =
        // value * ratioB * rootB, solves the new weight rootB / rootA.
        parent[rootB] = rootA;
        weight[rootB] = ratioA / (value * ratioB);
        size[rootA] += size[rootB];
    }

    double query(unordered_map<string, string> &parent, unordered_map<string, double> &weight, const string &start,
                 const string &end) {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if (parent.find(start) == parent.end() || parent.find(end) == parent.end())
            return -1.0;
        auto [rootStart, ratioStart] = find(parent, weight, start);
        auto [rootEnd, ratioEnd] = find(parent, weight, end);
        if (rootStart != rootEnd)
            // Different roots mean no stated ratio links the two groups.
            return -1.0;
        return ratioStart / ratioEnd;
    }
};
