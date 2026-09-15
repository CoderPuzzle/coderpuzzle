#include <unordered_map>
#include <vector>

class Solution {
  public:
    int lowestCommonAncestor(TreeNode *root, std::vector<int> &nodes) {
        // One iterative pass — an explicit stack, never recursion, since
        // a skewed tree runs 10^4 nodes deep — records each value's depth
        // and parent. Values are unique, so a value keys both maps. The
        // answer then folds pairwise over the query values: hold the
        // running LCA candidate, and for each further value lift the
        // deeper of the two to the other's depth, then walk both up in
        // lockstep until they meet. The LCA is associative — the LCA of
        // the whole list is the LCA of the running candidate and each new
        // value — so the fold lands on the shared ancestor, and a
        // one-value query returns that value untouched. The root records
        // itself as its own parent; no climb ever passes the LCA, which
        // is at the latest the root, so the sentinel is never followed.
        std::unordered_map<int, int> depth_of;
        std::unordered_map<int, int> parent_of;
        depth_of[root->val] = 0;
        parent_of[root->val] = root->val;
        std::vector<TreeNode *> pending{root};
        while (!pending.empty()) {
            TreeNode *node = pending.back();
            pending.pop_back();
            int child_depth = depth_of[node->val] + 1;
            if (node->left != nullptr) {
                depth_of[node->left->val] = child_depth;
                parent_of[node->left->val] = node->val;
                pending.push_back(node->left);
            }
            if (node->right != nullptr) {
                depth_of[node->right->val] = child_depth;
                parent_of[node->right->val] = node->val;
                pending.push_back(node->right);
            }
        }
        int lca = nodes[0];
        for (std::size_t i = 1; i < nodes.size(); i++) {
            int a = lca;
            int b = nodes[i];
            while (depth_of[a] > depth_of[b]) {
                a = parent_of[a];
            }
            while (depth_of[b] > depth_of[a]) {
                b = parent_of[b];
            }
            while (a != b) {
                a = parent_of[a];
                b = parent_of[b];
            }
            lca = a;
        }
        return lca;
    }
};
