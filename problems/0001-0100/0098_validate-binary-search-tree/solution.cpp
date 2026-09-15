class Solution {
  public:
    bool isValidBST(TreeNode *root) {
        // frame pairs a subtree with the open interval (lo, hi) it is
        // confined to. Bounds are long long, not int: node values reach the
        // int32 extremes, so the initial interval must be strictly wider
        // than any value can be.
        struct Frame {
            TreeNode *node;
            long long lo, hi;
        };
        // Preorder with an explicit stack — the same shape in every language,
        // chosen because recursion would overflow Python's call-stack limit
        // on a 10'000-node chain.
        vector<Frame> stack;
        stack.push_back({root, LLONG_MIN, LLONG_MAX});
        while (!stack.empty()) {
            Frame frame = stack.back();
            stack.pop_back();
            if (frame.node == nullptr) {
                // An empty subtree satisfies every bound vacuously.
                continue;
            }
            // Strict on both sides: equal keys falsify a BST.
            if (frame.lo >= frame.node->val || frame.node->val >= frame.hi) {
                return false;
            }
            stack.push_back({frame.node->left, frame.lo, frame.node->val});
            stack.push_back({frame.node->right, frame.node->val, frame.hi});
        }
        return true;
    }
};
