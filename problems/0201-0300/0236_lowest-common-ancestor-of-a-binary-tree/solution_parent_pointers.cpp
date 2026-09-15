class Solution {
  public:
    int lowestCommonAncestor(TreeNode *root, int p, int q) {
        // One walk over the tree records every node's parent. Values are
        // unique, so a value identifies its node; the root records none.
        unordered_map<int, int> parent;
        vector<TreeNode *> stack = {root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            for (TreeNode *child : {node->left, node->right}) {
                if (child != nullptr) {
                    parent[child->val] = node->val;
                    stack.push_back(child);
                }
            }
        }
        // Every node on the root-to-p chain, p and root included, is a
        // shared ancestor candidate: it is an ancestor of p by construction.
        unordered_set<int> ancestors;
        int value = p;
        while (parent.count(value) != 0) {
            ancestors.insert(value);
            value = parent[value];
        }
        ancestors.insert(value);
        // Climb from q: the first candidate met is the deepest node whose
        // subtree covers both targets.
        value = q;
        while (ancestors.count(value) == 0) {
            value = parent[value];
        }
        return value;
    }
};
