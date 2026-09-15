class Solution {
  public:
    vector<int> minOperationsQueries(int n, vector<vector<int>> &edges, vector<vector<int>> &queries) {
        // Adjacency as flat per-node arrays of (neighbor, weight) pairs: two
        // passes over the edge list.
        vector<int> degree(n, 0);
        for (const auto &edge : edges) {
            ++degree[edge[0]];
            ++degree[edge[1]];
        }
        vector<vector<pair<int, int>>> adjacency(n);
        for (int node = 0; node < n; ++node) {
            adjacency[node].reserve(degree[node]);
        }
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back({edge[1], edge[2] - 1});
            adjacency[edge[1]].push_back({edge[0], edge[2] - 1});
        }

        // One breadth-first search from node 0 fills every static structure:
        // parent/depth and a parent-before-child order that both the weight
        // frequency prefixes and the lifting table consume in one sweep. The
        // queue keeps a 10^4-node path off the call stack.
        vector<int> parent(n, 0);
        vector<int> pweight(n, 0);
        vector<int> depth(n, 0);
        vector<char> seen(n, 0);
        vector<int> order;
        order.reserve(n);
        seen[0] = 1;
        order.push_back(0);
        for (int head = 0; head < (int)order.size(); ++head) {
            int node = order[head];
            for (const auto &neighbor : adjacency[node]) {
                int next = neighbor.first;
                if (!seen[next]) {
                    seen[next] = 1;
                    parent[next] = node;
                    pweight[next] = neighbor.second;
                    depth[next] = depth[node] + 1;
                    order.push_back(next);
                }
            }
        }

        // Changing an edge to any value leaves other edges untouched, so an
        // operation fixes exactly one edge of the path and the answer is the
        // path length minus its most frequent edge weight. Weights live in
        // 1..26, so freq[w][v] counts weight-w edges from the root down to v;
        // on the a..b path that count is freq[a][w] + freq[b][w] - 2 *
        // freq[lca][w]: every edge above the lowest common ancestor appears
        // in both root paths and cancels, and the LCA's own incoming edge
        // cancels with itself.
        vector<vector<int>> freq(26, vector<int>(n, 0));
        for (int index = 1; index < n && index < (int)order.size(); ++index) {
            int node = order[index];
            for (int w = 0; w < 26; ++w) {
                freq[w][node] = freq[w][parent[node]];
            }
            ++freq[pweight[node]][node];
        }

        // Binary lifting over the parent pointers: table[level][v] is the
        // 2^level-th ancestor of v (the root maps to itself), which makes
        // each query an O(log n) climb instead of a walk along the possibly
        // O(n) path. Every stored value stays below 2^17 << 2^31.
        int maxDepth = 0;
        for (int node = 0; node < n; ++node) {
            maxDepth = max(maxDepth, depth[node]);
        }
        int levels = 1;
        while ((1 << levels) <= maxDepth) {
            ++levels;
        }
        vector<vector<int>> table(levels);
        table[0] = parent;
        for (int level = 1; level < levels; ++level) {
            const vector<int> &previous = table[level - 1];
            vector<int> &current = table[level];
            current.resize(n);
            for (int node = 0; node < n; ++node) {
                current[node] = previous[previous[node]];
            }
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int u = query[0];
            int v = query[1];
            if (depth[u] < depth[v]) {
                swap(u, v);
            }
            int diff = depth[u] - depth[v];
            int level = 0;
            while (diff > 0) {
                if (diff & 1) {
                    u = table[level][u];
                }
                diff >>= 1;
                ++level;
            }
            int lca;
            if (u != v) {
                for (level = levels - 1; level >= 0; --level) {
                    const vector<int> &row = table[level];
                    if (row[u] != row[v]) {
                        u = row[u];
                        v = row[v];
                    }
                }
                lca = parent[u];
            } else {
                lca = u;
            }
            int best = -1;
            for (int w = 0; w < 26; ++w) {
                int count = freq[w][query[0]] + freq[w][query[1]] - 2 * freq[w][lca];
                if (count > best) {
                    best = count;
                }
            }
            int pathLength = depth[query[0]] + depth[query[1]] - 2 * depth[lca];
            answer.push_back(pathLength - best);
        }
        return answer;
    }
};
