class Solution {
  public:
    string getDirections(TreeNode *root, int startValue, int destValue) {
        unordered_map<int, int> parent;
        unordered_map<int, char> incoming;
        parent[root->val] = 0;
        vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (node->left != nullptr) {
                parent[node->left->val] = node->val;
                incoming[node->left->val] = 'L';
                stack.push_back(node->left);
            }
            if (node->right != nullptr) {
                parent[node->right->val] = node->val;
                incoming[node->right->val] = 'R';
                stack.push_back(node->right);
            }
        }

        unordered_map<int, int> distance;
        int node = startValue;
        int steps = 0;
        while (node != 0) {
            distance[node] = steps++;
            node = parent[node];
        }

        string downward;
        node = destValue;
        while (distance.find(node) == distance.end()) {
            downward.push_back(incoming[node]);
            node = parent[node];
        }
        reverse(downward.begin(), downward.end());
        return string(distance[node], 'U') + downward;
    }
};
