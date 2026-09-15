class Solution {
  public:
    int minRunesToAdd(int n, vector<int> &crystals, vector<int> &flowFrom, vector<int> &flowTo) {
        vector<vector<int>> graph(n), rgraph(n);
        for (int e = 0; e < (int)flowFrom.size(); e++) {
            int u = flowFrom[e], v = flowTo[e];
            graph[u].push_back(v);
            rgraph[v].push_back(u);
        }

        // Kosaraju SCC (iterative)
        vector<bool> visited(n, false);
        vector<int> order;
        order.reserve(n);
        for (int s = 0; s < n; s++) {
            if (visited[s]) {
                continue;
            }
            vector<pair<int, int>> stack;
            stack.push_back({s, 0});
            visited[s] = true;
            while (!stack.empty()) {
                auto &[u, idx] = stack.back();
                if (idx < (int)graph[u].size()) {
                    int v = graph[u][idx];
                    idx++;
                    if (!visited[v]) {
                        visited[v] = true;
                        stack.push_back({v, 0});
                    }
                } else {
                    order.push_back(u);
                    stack.pop_back();
                }
            }
        }

        vector<int> comp(n, -1);
        int cid = 0;
        for (int idx = (int)order.size() - 1; idx >= 0; idx--) {
            int s = order[idx];
            if (comp[s] != -1) {
                continue;
            }
            vector<int> stack;
            stack.push_back(s);
            comp[s] = cid;
            while (!stack.empty()) {
                int u = stack.back();
                stack.pop_back();
                for (int v : rgraph[u]) {
                    if (comp[v] == -1) {
                        comp[v] = cid;
                        stack.push_back(v);
                    }
                }
            }
            cid++;
        }

        vector<bool> hasCrystal(cid, false);
        for (int c : crystals) {
            hasCrystal[comp[c]] = true;
        }

        vector<vector<int>> cgraph(cid);
        vector<int> inDeg(cid, 0);
        set<pair<int, int>> seen;
        for (int u = 0; u < n; u++) {
            for (int v : graph[u]) {
                int cu = comp[u], cv = comp[v];
                if (cu != cv && seen.insert({cu, cv}).second) {
                    cgraph[cu].push_back(cv);
                    inDeg[cv]++;
                }
            }
        }

        // BFS from crystal-containing components
        vector<bool> good(cid, false);
        deque<int> q;
        for (int c = 0; c < cid; c++) {
            if (hasCrystal[c]) {
                good[c] = true;
                q.push_back(c);
            }
        }
        while (!q.empty()) {
            int u = q.front();
            q.pop_front();
            for (int v : cgraph[u]) {
                if (!good[v]) {
                    good[v] = true;
                    q.push_back(v);
                }
            }
        }

        int ans = 0;
        for (int c = 0; c < cid; c++) {
            if (!good[c] && inDeg[c] == 0) {
                ans++;
            }
        }
        return ans;
    }
};
