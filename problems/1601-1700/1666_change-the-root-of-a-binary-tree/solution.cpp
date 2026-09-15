#include <unordered_map>
#include <vector>

class Solution {
  public:
    TreeNode *flipBinaryTree(TreeNode *root, int leaf) {
        // Rerooting is a walk, not a rebuild: the rule names, for every
        // node on the leaf-to-root path, exactly which pointers move. One
        // descent first records each node's parent, keyed by value (values
        // are unique, so the first node met with the leaf's value is the
        // leaf itself) — the parent pointers the statement demands, kept
        // in the solver's own map.
        std::unordered_map<int, TreeNode *> parent;
        parent[root->val] = nullptr;
        TreeNode *target = nullptr;
        std::vector<TreeNode *> pending{root};
        while (!pending.empty()) {
            TreeNode *node = pending.back();
            pending.pop_back();
            if (node->val == leaf) {
                target = node;
            }
            for (TreeNode *child : {node->right, node->left}) {
                if (child != nullptr) {
                    parent[child->val] = node;
                    pending.push_back(child);
                }
            }
        }
        // Then the two steps are applied bottom-up, stopping before the
        // root: clear the parent's downward pointer (emptying the slot the
        // moved subtree needs), move a surviving left child across to the
        // right, and attach the parent as the new left child. The leaf the
        // walk started from is the new root.
        TreeNode *cur = target;
        while (parent[cur->val] != nullptr) {
            TreeNode *above = parent[cur->val];
            if (above->left == cur) {
                above->left = nullptr;
            } else if (above->right == cur) {
                above->right = nullptr;
            }
            if (cur->left != nullptr) {
                cur->right = cur->left;
            }
            cur->left = above;
            cur = above;
        }
        return target;
    }
};
