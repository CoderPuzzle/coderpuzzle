#include <algorithm>
#include <unordered_map>
#include <utility>
#include <vector>

class Solution {
  public:
    TreeNode *subtreeWithAllDeepest(TreeNode *root) {
        if (root == nullptr) {
            return nullptr;
        }
        // A node can only be judged once both of its children's
        // heights are known, so the walk is post-order — children
        // before the node — over an explicit stack of (node,
        // measured) pairs: the first pop pushes the node's own merge
        // beneath its two children, and that merge — the second pop —
        // can only fire once both subtrees are measured. Iterating
        // keeps a 500-node chain's ~500 merges off the call stack.
        unordered_map<TreeNode *, int> heights;
        unordered_map<TreeNode *, TreeNode *> smallest;
        vector<pair<TreeNode *, bool>> stack = {{root, false}};
        while (!stack.empty()) {
            auto [node, measured] = stack.back();
            stack.pop_back();
            if (!measured) {
                stack.push_back({node, true});
                if (node->right != nullptr) {
                    stack.push_back({node->right, false});
                }
                if (node->left != nullptr) {
                    stack.push_back({node->left, false});
                }
                continue;
            }
            int lh = node->left == nullptr ? 0 : heights[node->left];
            int rh = node->right == nullptr ? 0 : heights[node->right];
            heights[node] = 1 + max(lh, rh);
            // Equal heights: each side reaches this subtree's
            // deepest level, so its deepest nodes sit on both sides
            // and only this node covers them all — it is the
            // subtree's answer. Unequal: no deepest node can live in
            // the shallower side, so the deeper side's answer passes
            // through unchanged.
            if (lh == rh) {
                smallest[node] = node;
            } else {
                smallest[node] = smallest[lh > rh ? node->left : node->right];
            }
        }
        return smallest[root];
    }
};
