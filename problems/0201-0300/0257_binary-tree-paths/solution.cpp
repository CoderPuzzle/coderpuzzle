class Solution {
  public:
    vector<string> binaryTreePaths(TreeNode *root) {
        vector<string> paths;
        // The constraints guarantee at least one node, so root is never null.
        walk(root, "", paths);
        return paths;
    }

  private:
    // Pre-order walk carrying the half-built string: each step appends
    // "->" and the child's value, and a leaf commits the whole path.
    void walk(TreeNode *node, string path, vector<string> &paths) {
        string extended = path + to_string(node->val);
        // A leaf is a node with no children — both absent. A node with
        // only one child is a pass-through, never a terminal.
        if (node->left == nullptr && node->right == nullptr) {
            paths.push_back(extended);
            return;
        }
        // Left subtree before right, so paths are emitted in the order
        // the pinned depth-first walk meets the leaves.
        if (node->left != nullptr) {
            walk(node->left, extended + "->", paths);
        }
        if (node->right != nullptr) {
            walk(node->right, extended + "->", paths);
        }
    }
};
