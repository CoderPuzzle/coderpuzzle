#include <vector>

class Solution {
  public:
    int rangeSumBST(TreeNode *root, int low, int high) {
        // A node below low drags its whole left subtree below low with it,
        // so only its right subtree can hold hits; a node above high is
        // the mirror image; an in-window node counts and either subtree
        // may still hit. That three-way rule visits exactly the nodes that
        // can matter. The walk carries its own stack: the constraints
        // allow a 2*10^4-node chain, and recursion would nest twenty
        // thousand frames — past CPython's default limit and over the
        // 512k stacks the judge hands Java and Node.
        int total = 0;
        vector<TreeNode *> stack;
        if (root != nullptr) {
            stack.push_back(root);
        }
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (node->val < low) {
                if (node->right != nullptr)
                    stack.push_back(node->right);
            } else if (node->val > high) {
                if (node->left != nullptr)
                    stack.push_back(node->left);
            } else {
                total += node->val;
                if (node->left != nullptr)
                    stack.push_back(node->left);
                if (node->right != nullptr)
                    stack.push_back(node->right);
            }
        }
        return total;
    }
};
