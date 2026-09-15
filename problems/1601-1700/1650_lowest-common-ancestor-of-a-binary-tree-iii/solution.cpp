#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int lowestCommonAncestor(TreeNode *root, int p, int q) {
        // The original hands p and q as node references that each carry a
        // parent pointer, with no root given at all. Here the tree
        // arrives as root plus the two target values instead, so the
        // first step recovers what parent would have given directly: one
        // iterative pre-order pass builds a value -> parent-value map.
        // Node values are unique, so a value is a safe, hashable key.
        std::unordered_map<int, int> parentOf;
        std::unordered_map<int, bool> hasParent;
        std::vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
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
        // Walk p up to the root, collecting every value on that path —
        // exactly the "store the path from p" step the original hints at.
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
        // the lowest shared ancestor. This also handles either target
        // already being the other's ancestor, since the starting value is
        // checked before climbing.
        val = q;
        while (!ancestors.count(val)) {
            val = parentOf[val];
        }
        return val;
    }
};
