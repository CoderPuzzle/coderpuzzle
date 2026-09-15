class Solution {
    using Matrix = array<long long, 4>;
    static constexpr long long MOD = 1000000007;

    Matrix multiply(const Matrix &a, const Matrix &b) {
        return {(a[0] * b[0] + a[1] * b[2]) % MOD, (a[0] * b[1] + a[1] * b[3]) % MOD, (a[2] * b[0] + a[3] * b[2]) % MOD,
                (a[2] * b[1] + a[3] * b[3]) % MOD};
    }

  public:
    int distinctPaths(int n, vector<int> &parent, vector<vector<int>> &gates, vector<vector<int>> &queries) {
        int levels = 1;
        while ((1 << levels) <= n)
            ++levels;
        vector<vector<int>> children(n);
        for (int node = 1; node < n; ++node)
            children[parent[node]].push_back(node);
        vector<int> depth(n), order{0};
        for (int i = 0; i < (int)order.size(); ++i) {
            for (int child : children[order[i]]) {
                depth[child] = depth[order[i]] + 1;
                order.push_back(child);
            }
        }
        vector<vector<int>> up(levels, vector<int>(n));
        vector<vector<Matrix>> matrices(levels, vector<Matrix>(n, {1, 0, 0, 1}));
        for (int node = 1; node < n; ++node) {
            up[0][node] = parent[node];
            matrices[0][node] = {gates[node][1], gates[node][2], gates[node][2], gates[node][0]};
        }
        for (int level = 1; level < levels; ++level) {
            for (int node = 0; node < n; ++node) {
                int middle = up[level - 1][node];
                up[level][node] = up[level - 1][middle];
                matrices[level][node] = multiply(matrices[level - 1][node], matrices[level - 1][middle]);
            }
        }
        auto lca = [&](int a, int b) {
            if (depth[a] < depth[b])
                swap(a, b);
            int difference = depth[a] - depth[b];
            for (int level = 0; level < levels; ++level)
                if ((difference >> level) & 1)
                    a = up[level][a];
            if (a == b)
                return a;
            for (int level = levels - 1; level >= 0; --level) {
                if (up[level][a] != up[level][b]) {
                    a = up[level][a];
                    b = up[level][b];
                }
            }
            return up[0][a];
        };
        auto ways = [&](int node, int card, int stop) {
            Matrix value{1, 0, 0, 1};
            int difference = depth[node] - depth[stop];
            for (int level = levels - 1; level >= 0; --level) {
                if ((difference >> level) & 1) {
                    value = multiply(value, matrices[level][node]);
                    node = up[level][node];
                }
            }
            return (card == 0 ? value[0] + value[1] : value[2] + value[3]) % MOD;
        };
        int answer = 0;
        for (auto &query : queries) {
            int stop = lca(query[0], query[2]);
            answer ^= ways(query[0], query[1], stop) * ways(query[2], query[3], stop) % MOD;
        }
        return answer;
    }
};
