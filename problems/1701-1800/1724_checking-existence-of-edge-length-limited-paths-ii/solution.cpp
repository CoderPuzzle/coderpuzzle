#include <algorithm>
#include <queue>
#include <utility>
#include <vector>

// A Kruskal minimum spanning forest annotated for max-edge queries:
// uniting the edges cheapest first leaves, between every pair of nodes, a
// tree path whose largest edge is as small as the graph allows, so "some
// path uses only edges < limit" reduces to reading that one tree path's
// maximum off a binary-lifting table.
class DistanceLimitedPathsExist {
  public:
    DistanceLimitedPathsExist(int n, vector<vector<int>> edgeList) : n_(n), depth_(n), root_of_(n) {
        // Kruskal: sorting by distance and uniting components turns the
        // accepted edges into one minimum spanning tree per component.
        sort(edgeList.begin(), edgeList.end(), [](const vector<int> &a, const vector<int> &b) { return a[2] < b[2]; });
        vector<int> parent(n);
        for (int node = 0; node < n; node++) {
            parent[node] = node;
        }
        vector<vector<pair<int, int>>> adjacency(n);
        for (const vector<int> &edge : edgeList) {
            int root_u = find(parent, edge[0]);
            int root_v = find(parent, edge[1]);
            if (root_u != root_v) {
                parent[root_u] = root_v;
                adjacency[edge[0]].push_back({edge[1], edge[2]});
                adjacency[edge[1]].push_back({edge[0], edge[2]});
            }
        }

        // One BFS per component fixes each node's root, depth, and
        // parent edge. A root's own parent entry stays (itself, 0), so a
        // lifting hop never runs off the top of its tree.
        vector<int> parent0(n);
        vector<int> weight0(n);
        for (int node = 0; node < n; node++) {
            parent0[node] = node;
            root_of_[node] = node;
        }
        vector<bool> visited(n, false);
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            visited[start] = true;
            queue<int> pending;
            pending.push(start);
            while (!pending.empty()) {
                int node = pending.front();
                pending.pop();
                for (auto [neighbor, dis] : adjacency[node]) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        root_of_[neighbor] = start;
                        depth_[neighbor] = depth_[node] + 1;
                        parent0[neighbor] = node;
                        weight0[neighbor] = dis;
                        pending.push(neighbor);
                    }
                }
            }
        }

        // Lifting levels: up_[j][node] is the 2^j-th ancestor and max_edge_
        // the largest weight on that hop — two half-hops glued together.
        int deepest = 0;
        for (int node = 0; node < n; node++) {
            deepest = max(deepest, depth_[node]);
        }
        levels_ = max(1, 32 - __builtin_clz(deepest + 1));
        up_.assign(levels_, parent0);
        max_edge_.assign(levels_, weight0);
        for (int j = 1; j < levels_; j++) {
            for (int node = 0; node < n; node++) {
                int half = up_[j - 1][node];
                up_[j][node] = up_[j - 1][half];
                max_edge_[j][node] = max(max_edge_[j - 1][node], max_edge_[j - 1][half]);
            }
        }
    }

    bool query(int p, int q, int limit) {
        // Distinct spanning trees means no path exists at any limit.
        if (root_of_[p] != root_of_[q]) {
            return false;
        }
        if (p == q) {
            return true;
        }
        int best = 0;
        int a = p;
        int b = q;
        if (depth_[a] < depth_[b]) {
            swap(a, b);
        }
        // Lift the deeper node level by level until both depths match,
        // collecting every edge weight the hops pass over.
        int diff = depth_[a] - depth_[b];
        int level = 0;
        while (diff != 0) {
            if (diff & 1) {
                best = max(best, max_edge_[level][a]);
                a = up_[level][a];
            }
            diff >>= 1;
            level++;
        }
        if (a == b) {
            return best < limit;
        }
        // Lift both together while their 2^level ancestors differ — that
        // stops just below the LCA — then take the final parent edges.
        for (int j = levels_ - 1; j >= 0; j--) {
            if (up_[j][a] != up_[j][b]) {
                best = max({best, max_edge_[j][a], max_edge_[j][b]});
                a = up_[j][a];
                b = up_[j][b];
            }
        }
        best = max({best, max_edge_[0][a], max_edge_[0][b]});
        return best < limit;
    }

  private:
    static int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    int n_;
    int levels_;
    vector<int> depth_;
    vector<int> root_of_;
    vector<vector<int>> up_;
    vector<vector<int>> max_edge_;
};
