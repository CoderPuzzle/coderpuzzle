class Solution {
  public:
    TreeNode *buildTree(vector<int> &inorder, vector<int> &postorder) {
        // Value -> inorder index: makes each split lookup O(1) instead of a
        // linear scan. Values are unique, so a hit is exactly one split point.
        unordered_map<int, int> index;
        for (int i = 0; i < (int)inorder.size(); i++) {
            index[inorder[i]] = i;
        }
        // Postorder ends with the root, and the reversed array lists root,
        // right subtree, left subtree -- so a cursor walking postorder
        // backwards hands out subtree roots in exactly the order the frames
        // below claim them.
        int position = (int)postorder.size() - 1;
        // A dummy parent lets the real root pass through the same attach
        // logic as every other node; the answer is dummy.left.
        TreeNode dummy(0);
        // Frames are (parent, attach_left, low, high) over inorder ranges.
        // Popping a frame claims at most one root value from the cursor, so
        // an explicit stack -- not recursion -- drives the build: the
        // constraint ceiling allows a 3000-node chain, and recursion that
        // deep is not safe in every judge language.
        struct Frame {
            TreeNode *parent;
            bool attach_left;
            int low;
            int high;
        };
        vector<Frame> stack;
        stack.push_back(Frame{&dummy, true, 0, (int)inorder.size()});
        while (!stack.empty()) {
            Frame frame = stack.back();
            stack.pop_back();
            if (frame.low >= frame.high) {
                // Empty inorder range <=> missing subtree.
                continue;
            }
            int value = postorder[position];
            position--;
            TreeNode *node = new TreeNode(value);
            if (frame.attach_left) {
                frame.parent->left = node;
            } else {
                frame.parent->right = node;
            }
            int mid = index[value];
            // Inorder visits left, root, right: [low, mid) is the left
            // subtree and [mid + 1, high) the right. Left is pushed first
            // so the right frame pops -- and its root is consumed -- first.
            stack.push_back(Frame{node, true, frame.low, mid});
            stack.push_back(Frame{node, false, mid + 1, frame.high});
        }
        return dummy.left;
    }
};
