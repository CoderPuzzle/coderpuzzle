#include <vector>

class Solution {
  public:
    TreeNode *addOneRow(TreeNode *root, int val, int depth) {
        if (depth == 1) {
            // There is no depth 0 to splice under: the whole original tree
            // slips one level down as a fresh root's left subtree.
            TreeNode *fresh = new TreeNode(val);
            fresh->left = root;
            return fresh;
        }
        // The insertion row sits at a fixed depth, so the work is only
        // reaching it: a frontier starts at the root and steps down one
        // level per round — non-null children only — until it holds exactly
        // the nodes at depth - 1, the splice points. The frontier walk
        // iterates on purpose: the tree may be a single 10^4-node chain,
        // whose recursive descent would nest 10000 calls — needlessly at
        // the mercy of the runtime call stack.
        vector<TreeNode *> row{root};
        for (int level = 1; level < depth - 1; level++) {
            vector<TreeNode *> next;
            for (TreeNode *node : row) {
                if (node->left != nullptr) {
                    next.push_back(node->left);
                }
                if (node->right != nullptr) {
                    next.push_back(node->right);
                }
            }
            row = next;
        }
        for (TreeNode *node : row) {
            // Re-parent, never rebuild: each old subtree stays whole,
            // merely one level deeper under its fresh val node.
            TreeNode *freshLeft = new TreeNode(val);
            freshLeft->left = node->left;
            node->left = freshLeft;
            TreeNode *freshRight = new TreeNode(val);
            freshRight->right = node->right;
            node->right = freshRight;
        }
        return root;
    }
};
