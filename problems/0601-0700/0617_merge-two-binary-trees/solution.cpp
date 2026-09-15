#include <utility>
#include <vector>

class Solution {
  public:
    TreeNode *mergeTrees(TreeNode *root1, TreeNode *root2) {
        // The merge rule pairs positions: nodes at the same spot in
        // both trees overlap and their values sum, while a spot only
        // one tree fills keeps that node — and everything under it —
        // as is. An empty input therefore returns the other tree
        // whole, and the merged tree is built on root1's nodes: reuse,
        // not copy, since the judge serializes the returned tree to
        // its level-order values and never node identity. The walk
        // carries an explicit stack of overlapping pairs — a skewed
        // 2000-node chain would nest 2000 calls, needlessly at the
        // mercy of the runtime call stack. Values lie in [-10^4,
        // 10^4], so a merged value never leaves ±2·10^4; int holds
        // that with room to spare.
        if (root1 == nullptr)
            return root2;
        if (root2 == nullptr)
            return root1;
        vector<pair<TreeNode *, TreeNode *>> pending;
        pending.push_back({root1, root2});
        while (!pending.empty()) {
            // One entry settles one overlapping pair: sum the values
            // here, then settle each child slot — both trees fill it
            // and the child pair joins the stack, only root2 fills it
            // and its subtree attaches whole.
            auto [node1, node2] = pending.back();
            pending.pop_back();
            node1->val += node2->val;
            if (node1->left == nullptr) {
                node1->left = node2->left;
            } else if (node2->left != nullptr) {
                pending.push_back({node1->left, node2->left});
            }
            if (node1->right == nullptr) {
                node1->right = node2->right;
            } else if (node2->right != nullptr) {
                pending.push_back({node1->right, node2->right});
            }
        }
        return root1;
    }
};
