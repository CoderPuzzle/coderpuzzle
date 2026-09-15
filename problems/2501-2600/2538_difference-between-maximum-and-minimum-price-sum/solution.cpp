#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maxOutput(int n, std::vector<std::vector<int>> &edges, std::vector<int> &price) {
        if (n == 1) {
            return 0;
        }
        std::vector<std::vector<int>> adj(n);
        for (const auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Root at 0 once: BFS fixes parents and a top-down visit order,
        // so every later pass walks flat arrays and nothing recurses.
        std::vector<int> parent(n, -1);
        std::vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (std::size_t head = 0; head < order.size(); ++head) {
            int u = order[head];
            for (int v : adj[u]) {
                if (parent[v] == -1 && v != 0) {
                    parent[v] = u;
                    order.push_back(v);
                }
            }
        }

        // d[v]: best price sum of an "arm", a vertical path starting at
        // v and descending into v's subtree. t1/t2/t1src remember the
        // best two child arms per node so the downward pass can hand each
        // child its "best arm excluding your own branch" value. Path sums
        // reach n * max(price) = 10^10, beyond int range, hence the
        // 64-bit accumulators.
        std::vector<long long> d(n, 0), t1(n, 0), t2(n, 0), up(n, 0);
        std::vector<int> t1src(n, -1);
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            d[v] = price[v] + t1[v];
            int p = parent[v];
            if (p >= 0) {
                if (d[v] > t1[p]) {
                    t2[p] = t1[p];
                    t1[p] = d[v];
                    t1src[p] = v;
                } else if (d[v] > t2[p]) {
                    t2[p] = d[v];
                }
            }
        }

        // Rerooting. The minimum path at any root is always the lone root,
        // which cancels against its own price inside every arm sum, so the
        // asked difference is exactly the largest arm leaving each node:
        // either straight down into a child subtree (t1) or climbing out
        // through the parent (up).
        long long ans = t1[0];
        for (int i = 1; i < n; ++i) {
            int v = order[i];
            int p = parent[v];
            long long others = t1src[p] == v ? t2[p] : t1[p];
            up[v] = price[p] + std::max(others, up[p]);
            ans = std::max(ans, std::max(t1[v], up[v]));
        }
        return ans;
    }
};
