class Solution {
  public:
    bool validateBinaryTreeNodes(int n, vector<int> &leftChild, vector<int> &rightChild) {
        // At most one parent each, exactly one root, and full reachability
        // from that root: together necessary and sufficient.
        vector<int> indegree(n, 0);
        for (const auto &children : {leftChild, rightChild}) {
            for (int child : children) {
                if (child != -1) {
                    ++indegree[child];
                }
            }
        }
        int root = -1;
        int roots = 0;
        for (int i = 0; i < n; ++i) {
            if (indegree[i] == 0) {
                root = i;
                ++roots;
            } else if (indegree[i] > 1) {
                return false;
            }
        }
        if (roots != 1) {
            return false;
        }
        vector<bool> seen(n, false);
        queue<int> pending;
        seen[root] = true;
        pending.push(root);
        int visited = 1;
        while (!pending.empty()) {
            int node = pending.front();
            pending.pop();
            for (int child : {leftChild[node], rightChild[node]}) {
                if (child != -1 && !seen[child]) {
                    seen[child] = true;
                    ++visited;
                    pending.push(child);
                }
            }
        }
        return visited == n;
    }
};
