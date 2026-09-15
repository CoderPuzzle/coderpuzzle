class Solution {
  public:
    int maximumInvitations(vector<int> &favorite) {
        int n = favorite.size();
        // favorite defines a functional graph: disjoint cycles with in-trees
        // hanging off them.
        vector<int> indeg(n, 0);
        for (int f : favorite) {
            indeg[f]++;
        }

        // Kahn-style peel of the acyclic nodes: after it, depth[v] is the
        // node count of the longest chain of non-cycle employees leading
        // directly into v (at least 1 — itself), i.e. the arm length a
        // 2-cycle can absorb on that side.
        vector<int> depth(n, 1);
        vector<int> queue;
        queue.reserve(n);
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) {
                queue.push_back(i);
            }
        }
        for (size_t head = 0; head < queue.size(); ++head) {
            int u = queue[head];
            int v = favorite[u];
            if (depth[u] + 1 > depth[v]) {
                depth[v] = depth[u] + 1;
            }
            if (--indeg[v] == 0) {
                queue.push_back(v);
            }
        }

        // Whatever still has positive indegree is a cycle node. A seating is
        // either one whole cycle >= 3 (outsiders can't join: every neighbor
        // seat is taken) or 2-cycles with both chains — and several pairs can
        // share one table, so those add up.
        int maxCycle = 0;
        int pairSum = 0;
        vector<char> visited(n, 0);
        for (int i = 0; i < n; i++) {
            if (indeg[i] > 0 && !visited[i]) {
                int cycleLen = 0;
                int cur = i;
                while (!visited[cur]) {
                    visited[cur] = 1;
                    cycleLen++;
                    cur = favorite[cur];
                }
                if (cycleLen == 2) {
                    // The pair sits together; each side takes one chain.
                    pairSum += depth[i] + depth[favorite[i]];
                } else if (cycleLen > maxCycle) {
                    maxCycle = cycleLen;
                }
            }
        }
        return max(maxCycle, pairSum);
    }
};
