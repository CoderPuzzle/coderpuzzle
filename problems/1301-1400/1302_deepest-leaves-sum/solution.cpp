class Solution {
  public:
    int deepestLeavesSum(TreeNode *root) {
        // Level-order sweep: levelSum is overwritten at every level, so when
        // the queue finally empties it holds exactly the deepest leaves' sum.
        if (root == nullptr) {
            return 0;
        }
        queue<TreeNode *> pending;
        pending.push(root);
        int levelSum = 0;
        while (!pending.empty()) {
            levelSum = 0;
            for (int size = (int)pending.size(); size > 0; --size) {
                TreeNode *node = pending.front();
                pending.pop();
                levelSum += node->val;
                if (node->left != nullptr) {
                    pending.push(node->left);
                }
                if (node->right != nullptr) {
                    pending.push(node->right);
                }
            }
        }
        return levelSum;
    }
};
