#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    TreeNode *lowestCommonAncestor(TreeNode *root, int p, int q) {
        // Iterative pre-order build of a value -> parent-value map (and a
        // value -> node lookup) in one pass. Node values are unique, so a
        // value serves as a stable, hashable key everywhere. Once built,
        // p and q's presence is a plain membership check against nodeOf —
        // this is the existence check, done for free by the same walk that
        // will drive the LCA search.
        if (root == nullptr) {
            return nullptr;
        }
        std::unordered_map<int, TreeNode *> nodeOf;
        std::unordered_map<int, bool> hasParent;
        std::unordered_map<int, int> parentOf;
        std::vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            nodeOf[node->val] = node;
            if (node->left != nullptr) {
                parentOf[node->left->val] = node->val;
                hasParent[node->left->val] = true;
                stack.push_back(node->left);
            }
            if (node->right != nullptr) {
                parentOf[node->right->val] = node->val;
                hasParent[node->right->val] = true;
                stack.push_back(node->right);
            }
        }
        if (!nodeOf.count(p) || !nodeOf.count(q)) {
            return nullptr;
        }
        // Walk p up to the root, collecting every value on that path.
        std::unordered_set<int> ancestors;
        int val = p;
        while (true) {
            ancestors.insert(val);
            if (!hasParent[val]) {
                break;
            }
            val = parentOf[val];
        }
        // Walk q up until it lands on a value already seen from p; that is
        // the lowest shared ancestor (this also handles p == q and either
        // one already being the other's ancestor, since the starting value
        // is checked before climbing).
        val = q;
        while (!ancestors.count(val)) {
            val = parentOf[val];
        }
        return nodeOf[val];
    }
};
