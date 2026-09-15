#include <unordered_map>
#include <vector>

class Solution {
  public:
    int equalToDescendants(TreeNode *root) {
        // A reverse preorder walk visits children before parents, so
        // processing the collected nodes back-to-front lets each node's
        // subtree sum be built from its children's already-computed sums.
        // A node counts when its value equals the sum of its descendants,
        // i.e. its subtree sum minus its own value. The traversal is fully
        // iterative, so a 10^5-deep skewed tree cannot overflow any stack.
        // Subtree sums reach 10^5 * 10^5 = 10^10, so they need 64 bits.
        std::vector<TreeNode *> order;
        std::vector<TreeNode *> pending{root};
        while (!pending.empty()) {
            TreeNode *node = pending.back();
            pending.pop_back();
            order.push_back(node);
            if (node->right != nullptr)
                pending.push_back(node->right);
            if (node->left != nullptr)
                pending.push_back(node->left);
        }
        std::unordered_map<TreeNode *, long long> subtree;
        int count = 0;
        for (int i = (int)order.size() - 1; i >= 0; --i) {
            TreeNode *node = order[i];
            long long total = node->val + subtree[node->left] + subtree[node->right];
            subtree[node] = total;
            if ((long long)node->val == total - node->val)
                ++count;
        }
        return count;
    }
};
