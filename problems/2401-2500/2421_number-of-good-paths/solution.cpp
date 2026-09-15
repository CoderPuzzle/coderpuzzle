class Solution {
    vector<int> parent;
    vector<int> sz;

  public:
    int numberOfGoodPaths(vector<int> &vals, vector<vector<int>> &edges) {
        int n = (int)vals.size();
        parent.resize(n);
        sz.assign(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        map<int, vector<int>> byValue;
        for (int i = 0; i < n; i++) {
            byValue[vals[i]].push_back(i);
        }

        long long answer = 0;
        // Activate nodes in increasing value order (map iterates sorted):
        // smaller values are already merged, so unions only ever connect
        // components whose nodes are all <= v.
        for (auto &[v, nodes] : byValue) {
            for (int u : nodes) {
                // Union across edges to already-active (<= v) endpoints: the
                // value-v nodes are then connected exactly through paths
                // whose interior nodes are all <= v.
                for (int w : adj[u]) {
                    if (vals[w] <= v) {
                        unite(u, w);
                    }
                }
            }
            // Group this value's nodes by component; a component holding c
            // of them yields c*(c-1)/2 good paths (each unordered pair).
            unordered_map<int, int> componentCount;
            for (int u : nodes) {
                componentCount[find(u)]++;
            }
            for (auto &[r, c] : componentCount) {
                answer += (long long)c * (c - 1) / 2;
            }
        }
        // Every single node is a good path on its own.
        return (int)(answer + n);
    }

  private:
    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra == rb) {
            return;
        }
        if (sz[ra] < sz[rb]) {
            swap(ra, rb);
        }
        parent[rb] = ra;
        sz[ra] += sz[rb];
    }
};
