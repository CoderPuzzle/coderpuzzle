class Solution {
  public:
    int countUnivalSubtrees(TreeNode *root) {
        int count = 0;
        isUnival(root, count);
        return count;
    }

  private:
    // Post-order: each call reports whether the subtree rooted at `node` is
    // uni-value; every true is one more subtree for the count.
    bool isUnival(TreeNode *node, int &count) {
        // The empty tree is vacuously uni-value: an absent child never breaks
        // its parent. It is never counted, so root == nullptr yields 0.
        if (node == nullptr) {
            return true;
        }
        // Visit both children unconditionally: counting happens inside the
        // recursion, and a skipped branch would skip its own subtrees.
        bool left = isUnival(node->left, count);
        bool right = isUnival(node->right, count);
        bool uni = left && right && (node->left == nullptr || node->left->val == node->val) &&
                   (node->right == nullptr || node->right->val == node->val);
        if (uni) {
            ++count;
        }
        return uni;
    }
};
