class Solution {
  public:
    bool isEvenOddTree(TreeNode *root) {
        if (root == nullptr)
            return true;
        int level = 0;
        deque<TreeNode *> queue;
        queue.push_back(root);
        while (!queue.empty()) {
            int size = queue.size();
            bool hasPrev = false;
            int prev = 0;
            for (int s = 0; s < size; s++) {
                TreeNode *node = queue.front();
                queue.pop_front();
                if (level % 2 == 0) {
                    if (node->val % 2 == 0 || (hasPrev && node->val <= prev))
                        return false;
                } else {
                    if (node->val % 2 != 0 || (hasPrev && node->val >= prev))
                        return false;
                }
                prev = node->val;
                hasPrev = true;
                if (node->left != nullptr)
                    queue.push_back(node->left);
                if (node->right != nullptr)
                    queue.push_back(node->right);
            }
            level++;
        }
        return true;
    }
};
