class Solution {
  public:
    vector<vector<int>> pathSum(TreeNode *root, int targetSum) {
        vector<vector<int>> result;
        if (root == nullptr) {
            // The empty tree has no root-to-leaf paths at all.
            return result;
        }
        // A frame carries a node, the remaining sum before paying for it, and
        // the path-buffer length on entry — popping it later truncates the
        // buffer back to that prefix, which is the backtracking a recursive
        // stack performs.
        struct Frame {
            TreeNode *node;
            int remaining;
            size_t depth;
        };
        // `path` is one shared buffer: every accepted path is a copy, and the
        // walk truncates the buffer back instead of rebuilding it per node.
        vector<int> path;
        // Preorder with an explicit stack — the same shape in every language,
        // chosen because recursion would overflow Python's call-stack limit
        // on a 5000-node chain.
        vector<Frame> stack;
        stack.push_back({root, targetSum, 0});
        while (!stack.empty()) {
            Frame frame = stack.back();
            stack.pop_back();
            TreeNode *node = frame.node;
            path.resize(frame.depth);
            path.push_back(node->val);
            int remaining = frame.remaining - node->val;
            if (node->left == nullptr && node->right == nullptr) {
                if (remaining == 0) {
                    // A leaf whose root-to-leaf sum is on target: record a
                    // copy, since `path` keeps mutating after this point.
                    result.push_back(path);
                }
                continue;
            }
            // Push the right child first so the left subtree is popped first:
            // matching paths are discovered in preorder, left to right.
            if (node->right != nullptr)
                stack.push_back({node->right, remaining, frame.depth + 1});
            if (node->left != nullptr)
                stack.push_back({node->left, remaining, frame.depth + 1});
        }
        return result;
    }
};
