class Solution {
  public:
    int maxPathSum(TreeNode *root) {
        // Explicit post-order: (node, phase) frames replace the call stack.
        // Phase 0 = first visit (descend left), 1 = left done (descend
        // right), 2 = both done (combine). Finished single-side gains pile
        // on their own stack, the children's results waiting for the parent.
        vector<pair<TreeNode *, int>> stack;
        vector<long long> gains;
        // A path must contain at least one node, so start at -inf, not 0.
        long long best = numeric_limits<long long>::min();
        if (root != nullptr) {
            stack.push_back({root, 0});
        }
        while (!stack.empty()) {
            auto [node, phase] = stack.back();
            stack.pop_back();
            if (phase == 0) {
                // Reschedule as phase 1, then let the left subtree run
                // first by sitting on top of the stack.
                stack.push_back({node, 1});
                if (node->left != nullptr) {
                    stack.push_back({node->left, 0});
                }
            } else if (phase == 1) {
                stack.push_back({node, 2});
                if (node->right != nullptr) {
                    stack.push_back({node->right, 0});
                }
            } else {
                // Both subtrees finished: right's gain sits above left's on
                // the gain stack (left ran first). Missing children left
                // nothing to pop.
                optional<long long> rightGain, leftGain;
                if (node->right != nullptr)
                    rightGain = gains.back(), gains.pop_back();
                if (node->left != nullptr)
                    leftGain = gains.back(), gains.pop_back();
                // Clamp each side at 0: a negative branch is better left unvisited.
                long long downLeft = max(leftGain.value_or(0), 0LL);
                long long downRight = max(rightGain.value_or(0), 0LL);
                // The path bending through this node is a candidate for the
                // global answer.
                best = max(best, (long long)node->val + downLeft + downRight);
                // The parent may only extend the path through one side.
                gains.push_back((long long)node->val + max(downLeft, downRight));
            }
        }
        return (int)best;
    }
};
