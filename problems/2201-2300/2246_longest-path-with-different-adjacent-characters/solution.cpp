class Solution {
  public:
    int longestPath(vector<int> &parent, string s) {
        int n = (int)parent.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) {
            children[parent[i]].push_back(i);
        }

        // iterative DFS ordering (parents before children)
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : children[u]) {
                stack.push_back(v);
            }
        }

        int best = 1;
        vector<int> down(n, 0); // longest valid chain starting at u, going into its subtree
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int u = order[i];
            int first = 0, second = 0;
            for (int v : children[u]) {
                int d = s[v] != s[u] ? down[v] : 0;
                if (d > first) {
                    second = first;
                    first = d;
                } else if (d > second) {
                    second = d;
                }
            }
            down[u] = first + 1;
            if (first + second + 1 > best) {
                best = first + second + 1;
            }
        }
        return best;
    }
};
