class Solution {
  public:
    TreeNode *reverseOddLevels(TreeNode *root) {
        // Only values move — children stay attached — so reversing an odd
        // level means writing its value list back mirrored: first position
        // takes the last value, and so on inward. A frontier of nodes starts
        // at the root and steps down one level per round, mirroring each odd
        // level's values on arrival. The tree is perfect, so one null check
        // per node pair keeps the frontier free of nulls past the last level.
        vector<TreeNode *> row{root};
        int depth = 0;
        while (!row.empty()) {
            if (depth % 2 == 1) {
                vector<int> values;
                values.reserve(row.size());
                for (TreeNode *node : row)
                    values.push_back(node->val);
                for (size_t index = 0; index < row.size(); ++index)
                    row[index]->val = values[row.size() - 1 - index];
            }
            vector<TreeNode *> next;
            next.reserve(row.size() * 2);
            for (TreeNode *node : row) {
                if (node->left != nullptr) {
                    next.push_back(node->left);
                    next.push_back(node->right);
                }
            }
            row = move(next);
            depth += 1;
        }
        return root;
    }
};
