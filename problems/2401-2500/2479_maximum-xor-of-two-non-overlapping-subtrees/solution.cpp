class Solution {
  public:
    long long maxXor(int n, vector<vector<int>> &edges, vector<int> &values) {
        vector<vector<int>> graph(n);
        for (auto &e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        // iterative DFS for order + parents
        vector<int> parent(n, -1);
        vector<char> visited(n, 0);
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        visited[0] = 1;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : graph[u]) {
                if (!visited[v]) {
                    visited[v] = 1;
                    parent[v] = u;
                    stack.push_back(v);
                }
            }
        }

        vector<long long> sub(n);
        for (int i = 0; i < n; i++) {
            sub[i] = values[i];
        }
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int u = order[i];
            int p = parent[u];
            if (p >= 0) {
                sub[p] += sub[u];
            }
        }

        long long maxSum = 1;
        for (long long x : sub) {
            if (x > maxSum) {
                maxSum = x;
            }
        }
        int bits = 64 - __builtin_clzll((unsigned long long)maxSum);

        // flat trie
        vector<array<int, 2>> trie;
        trie.push_back({-1, -1});
        auto trieInsert = [&](long long value) {
            int node = 0;
            for (int b = bits - 1; b >= 0; b--) {
                int bit = (int)((value >> b) & 1);
                int nxt = trie[node][bit];
                if (nxt == -1) {
                    nxt = (int)trie.size();
                    trie.push_back({-1, -1});
                    trie[node][bit] = nxt;
                }
                node = nxt;
            }
        };
        auto trieQuery = [&](long long value) {
            int node = 0;
            long long result = 0;
            for (int b = bits - 1; b >= 0; b--) {
                int bit = (int)((value >> b) & 1);
                int want = 1 - bit;
                if (trie[node][want] != -1) {
                    result |= 1LL << b;
                    node = trie[node][want];
                } else {
                    node = trie[node][bit];
                }
                if (node == -1) {
                    return result;
                }
            }
            return result;
        };

        long long answer = trieQuery(sub[0]);

        vector<int> ptr(n, 0);
        vector<int> stk;
        vector<int> par;
        stk.push_back(0);
        par.push_back(-1);
        while (!stk.empty()) {
            int u = stk.back();
            int p = par.back();
            if (ptr[u] < (int)graph[u].size()) {
                int v = graph[u][ptr[u]++];
                if (v != p) {
                    long long best = trieQuery(sub[v]);
                    if (best > answer) {
                        answer = best;
                    }
                    stk.push_back(v);
                    par.push_back(u);
                }
            } else {
                stk.pop_back();
                par.pop_back();
                trieInsert(sub[u]);
            }
        }
        return answer;
    }
};
