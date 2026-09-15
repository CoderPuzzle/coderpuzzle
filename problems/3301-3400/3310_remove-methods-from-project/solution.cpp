class Solution {
  public:
    vector<int> remainingMethods(int n, int k, vector<vector<int>> &invocations) {
        vector<vector<int>> graph(n);
        for (auto &edge : invocations) {
            graph[edge[0]].push_back(edge[1]);
        }
        // Iterative DFS from k: a 10^5-long invocation chain would overflow
        // the recursion stack under the judged limits.
        vector<bool> suspicious(n, false);
        suspicious[k] = true;
        vector<int> stack = {k};
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            for (int nxt : graph[node]) {
                if (!suspicious[nxt]) {
                    suspicious[nxt] = true;
                    stack.push_back(nxt);
                }
            }
        }
        // The group may only be removed when no outside method invokes
        // into it; otherwise nothing is removed at all.
        for (auto &edge : invocations) {
            if (!suspicious[edge[0]] && suspicious[edge[1]]) {
                vector<int> all(n);
                for (int i = 0; i < n; i++) {
                    all[i] = i;
                }
                return all;
            }
        }
        vector<int> remaining;
        for (int node = 0; node < n; node++) {
            if (!suspicious[node]) {
                remaining.push_back(node);
            }
        }
        return remaining;
    }
};
