class Solution {
  public:
    int kthSmallest(TreeNode *root, int k) {
        // In-order traversal of a BST visits values in ascending order, so
        // the kth visit is the kth smallest. The explicit stack simulates the
        // recursion, keeping space proportional to the tree height.
        vector<TreeNode *> stack;
        TreeNode *node = root;
        while (node || !stack.empty()) {
            // Push and descend the left spine as far as possible.
            while (node) {
                stack.push_back(node);
                node = node->left;
            }
            // Left spine exhausted: popping is the "visit".
            node = stack.back();
            stack.pop_back();
            --k;
            // Early stop: the unvisited remainder is never touched.
            if (k == 0) {
                return node->val;
            }
            node = node->right;
        }
        return -1;
    }
};
