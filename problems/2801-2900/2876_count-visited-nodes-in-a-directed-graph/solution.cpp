class Solution {
  public:
    vector<int> countVisitedNodes(vector<int> &edges) {
        int n = edges.size();
        vector<int> state(n, 0); // 0 unvisited, 1 on the current path, 2 resolved
        vector<int> ans(n, 0);

        for (int start = 0; start < n; start++) {
            if (state[start] == 2)
                continue;
            vector<int> path;
            int cur = start;
            while (state[cur] == 0) {
                state[cur] = 1;
                path.push_back(cur);
                cur = edges[cur];
            }
            if (state[cur] == 1) {
                // A cycle was discovered; find its start inside path.
                int cycle_start = -1;
                for (int i = 0; i < (int)path.size(); i++) {
                    if (path[i] == cur) {
                        cycle_start = i;
                        break;
                    }
                }
                int length = (int)path.size() - cycle_start;
                for (int i = cycle_start; i < (int)path.size(); i++) {
                    ans[path[i]] = length;
                    state[path[i]] = 2;
                }
                for (int depth = 0; depth < cycle_start; depth++) {
                    ans[path[depth]] = length + (cycle_start - depth);
                    state[path[depth]] = 2;
                }
            } else {
                // path leads into an already-resolved component.
                int base = ans[cur];
                for (int depth = 0; depth < (int)path.size(); depth++) {
                    ans[path[depth]] = base + ((int)path.size() - depth);
                    state[path[depth]] = 2;
                }
            }
        }
        return ans;
    }
};
