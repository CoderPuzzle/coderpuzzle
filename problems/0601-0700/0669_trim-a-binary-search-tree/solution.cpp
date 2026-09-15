#include <vector>

class Solution {
  public:
    TreeNode *trimBST(TreeNode *root, int low, int high) {
        // A node below low drags its whole left subtree below low with
        // it — discard the node and continue in its right subtree; a
        // node above high is the mirror image. Walking that rule down
        // from the root lands on the first in-range node, the trimmed
        // tree's new root — or falls off the tree when nothing survives.
        while (root != nullptr && (root->val < low || root->val > high)) {
            root = root->val > high ? root->left : root->right;
        }
        if (root == nullptr) {
            return nullptr;
        }
        // Every node on the stack is in range, so only its children can
        // be out. Each repair replaces an out-of-range child link with a
        // same-side descendant — exactly the reattachment the recursive
        // trim would make — so surviving nodes keep their original
        // descendants. The traversal carries its own stack of nodes: the
        // tree may be a single 10^4-node chain, whose recursion would
        // nest 10000 calls — needlessly at the mercy of the runtime call
        // stack — so every runtime iterates instead.
        vector<TreeNode *> stack = {root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            // A left child below low carries its own left subtree below
            // low too; hoist the child's right child until the link
            // holds a node in range (only the low side can break here:
            // every left value is below the in-range parent, hence at
            // most high).
            while (node->left != nullptr && node->left->val < low) {
                node->left = node->left->right;
            }
            // A right child above high hoists its left child,
            // symmetrically.
            while (node->right != nullptr && node->right->val > high) {
                node->right = node->right->left;
            }
            if (node->left != nullptr) {
                stack.push_back(node->left);
            }
            if (node->right != nullptr) {
                stack.push_back(node->right);
            }
        }
        return root;
    }
};
