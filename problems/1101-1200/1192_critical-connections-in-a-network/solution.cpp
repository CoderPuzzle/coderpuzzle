class Solution {
    int timerVal;
    vector<int> discArr, lowArr;
    vector<vector<int>> graphArr;
    vector<vector<int>> bridgesArr;

    void dfs(int u, int parent) {
        // Tarjan bridge finding: disc is the DFS discovery time, low the
        // earliest discovery reachable from u's subtree via tree edges plus
        // at most one back edge
        discArr[u] = lowArr[u] = timerVal++;
        for (int v : graphArr[u]) {
            if (discArr[v] == -1) {
                dfs(v, u);
                // fold the child's reach upward
                lowArr[u] = min(lowArr[u], lowArr[v]);
                // bridge iff v's subtree cannot see past u: this tree edge
                // is the only route between the two sides
                if (lowArr[v] > discArr[u]) {
                    bridgesArr.push_back({min(u, v), max(u, v)});
                }
            } else if (v != parent) {
                // back edge to a non-parent ancestor relaxes low; skipping
                // the parent matters — that edge is the tree edge itself
                lowArr[u] = min(lowArr[u], discArr[v]);
            }
        }
    }

  public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>> &connections) {
        graphArr.assign(n, {});
        for (auto &e : connections) {
            graphArr[e[0]].push_back(e[1]);
            graphArr[e[1]].push_back(e[0]);
        }
        discArr.assign(n, -1);
        lowArr.assign(n, 0);
        timerVal = 0;
        bridgesArr.clear();
        // graph is connected, so one root reaches every server
        dfs(0, -1);
        // sort only for a deterministic output order
        sort(bridgesArr.begin(), bridgesArr.end());
        return bridgesArr;
    }
};
