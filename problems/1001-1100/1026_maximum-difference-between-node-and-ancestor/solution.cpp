class Solution {
  public:
    int maxAncestorDiff(TreeNode *root) {
        // Loop invariant: each frame holds a node plus the minimum and
        // maximum values seen among its strict ancestors — the node's own
        // value is not folded in yet.
        vector<tuple<TreeNode *, int, int>> pending;
        pending.push_back({root, root->val, root->val});
        int ans = 0;
        while (!pending.empty()) {
            auto [node, pathMin, pathMax] = pending.back();
            pending.pop_back();
            // The best pairing for this node always uses one of the two
            // running extremes above it: any other ancestor value lies
            // between pathMin and pathMax, so it can never beat both.
            ans = max({ans, abs(node->val - pathMin), abs(node->val - pathMax)});
            int newMin = min(pathMin, node->val);
            int newMax = max(pathMax, node->val);
            if (node->left != nullptr)
                pending.push_back({node->left, newMin, newMax});
            if (node->right != nullptr)
                pending.push_back({node->right, newMin, newMax});
        }
        return ans;
    }
};
