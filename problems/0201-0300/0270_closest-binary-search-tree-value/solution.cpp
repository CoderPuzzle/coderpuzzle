class Solution {
  public:
    int closestValue(TreeNode *root, double target) {
        // One root-to-leaf descent: the search path for target visits the
        // largest value below it and the smallest above it, so the closest
        // value is decided on the path alone.
        int best = 0;
        double bestDistance = numeric_limits<double>::infinity();
        TreeNode *node = root;
        while (node != nullptr) {
            double distance = abs(node->val - target);
            // Strictly closer wins; at exactly equal distance the smaller
            // value wins, which settles ties like target 3.5 over 3 and 4.
            if (distance < bestDistance || (distance == bestDistance && node->val < best)) {
                best = node->val;
                bestDistance = distance;
            }
            node = target < node->val ? node->left : node->right;
        }
        return best;
    }
};
