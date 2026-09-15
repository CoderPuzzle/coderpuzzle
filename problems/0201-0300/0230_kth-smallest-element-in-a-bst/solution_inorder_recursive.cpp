class Solution {
  public:
    int kthSmallest(TreeNode *root, int k) {
        // In-order traversal of a BST visits values in ascending order, so
        // the kth visit is the kth smallest. k is passed by reference and
        // counted down; answer records the kth visit's value.
        int answer = -1;
        // Recursion depth is bounded by the tree height h (worst case n on
        // a chain), which is why the iterative twin exists.
        inorder(root, k, answer);
        return answer;
    }

  private:
    void inorder(TreeNode *node, int &k, int &answer) {
        // Early stop: once the answer is recorded, the unvisited remainder
        // of the tree is never touched.
        if (node == nullptr || k == 0)
            return;
        inorder(node->left, k, answer);
        --k;
        if (k == 0) {
            answer = node->val;
            return;
        }
        inorder(node->right, k, answer);
    }
};
