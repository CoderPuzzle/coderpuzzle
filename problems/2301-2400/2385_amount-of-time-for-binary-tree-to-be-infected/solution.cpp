class Solution {
  public:
    // Infection crosses one edge per minute in both directions, so the
    // answer is the maximum distance from `start` once parent edges are
    // added. BFS layers off an adjacency map measure it.
    int amountOfTime(TreeNode *root, int start) {
        unordered_map<int, vector<int>> adj;
        vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (node == nullptr) {
                continue;
            }
            if (node->left != nullptr) {
                adj[node->val].push_back(node->left->val);
                adj[node->left->val].push_back(node->val);
                stack.push_back(node->left);
            }
            if (node->right != nullptr) {
                adj[node->val].push_back(node->right->val);
                adj[node->right->val].push_back(node->val);
                stack.push_back(node->right);
            }
        }
        unordered_set<int> seen{start};
        vector<int> frontier{start};
        int minutes = 0;
        while (!frontier.empty()) {
            vector<int> next;
            for (int u : frontier) {
                for (int v : adj[u]) {
                    if (seen.insert(v).second) {
                        next.push_back(v);
                    }
                }
            }
            if (next.empty()) {
                break;
            }
            ++minutes;
            frontier = move(next);
        }
        return minutes;
    }
};
