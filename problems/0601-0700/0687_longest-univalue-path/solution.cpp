#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int longestUnivaluePath(TreeNode *root) {
        // A same-value path reaches some highest node and falls into at
        // most two arms, so every node can summarize its subtree in one
        // number: the length, in edges, of the longest downward path of
        // its own value leaving it. Arms are settled children-first and a
        // running maximum over all bend points — the sum of a node's two
        // arms — is the answer. The walk carries its own stack: the
        // constraints allow a 1000-deep same-value chain, and recursion
        // would nest a thousand frames — past CPython's default limit and
        // over the 512k stacks the judge hands Java and Node.
        vector<TreeNode *> order;
        vector<TreeNode *> stack;
        if (root != nullptr) {
            stack.push_back(root);
        }
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            order.push_back(node);
            if (node->left != nullptr)
                stack.push_back(node->left);
            if (node->right != nullptr)
                stack.push_back(node->right);
        }

        // Pre-order collection puts every parent before its descendants,
        // so the reversed walk is post-order: a node's children's arms are
        // always already in the map when it looks them up.
        unordered_map<TreeNode *, int> arms;
        int best = 0;
        for (auto entry = order.rbegin(); entry != order.rend(); ++entry) {
            TreeNode *node = *entry;
            int left = node->left != nullptr && node->left->val == node->val ? arms[node->left] + 1 : 0;
            int right = node->right != nullptr && node->right->val == node->val ? arms[node->right] + 1 : 0;
            arms[node] = max(left, right);
            best = max(best, left + right);
        }
        return best;
    }
};
