class Solution {
  public:
    int widthOfBinaryTree(TreeNode *root) {
        int best = 0;
        // Depth -> {leftmost, rightmost} frame positions seen at that
        // depth — the two running extremes; the null slots between the
        // end nodes are counted by the arithmetic, never materialized.
        unordered_map<int, pair<long long, long long>> extremes;
        // Stack of frames. Popping the back, and pushing the right child
        // before the left, walks the tree root-first, left subtree before
        // right — preorder, which visits every depth in index order.
        vector<tuple<TreeNode *, int, long long>> stack;
        if (root != nullptr) {
            stack.push_back({root, 0, 0});
        }
        while (!stack.empty()) {
            auto [node, depth, pos] = stack.back();
            stack.pop_back();
            auto [it, inserted] = extremes.try_emplace(depth, pos, pos);
            if (!inserted) {
                if (pos < it->second.first)
                    it->second.first = pos;
                if (pos > it->second.second)
                    it->second.second = pos;
            }
            long long width = it->second.second - it->second.first + 1;
            if (width > best) {
                best = (int)width;
            }
            // Re-base before doubling: raw heap indices double per level
            // and blow past 64 bits on a deep chain. Shifted so the level
            // starts at its leftmost node, a stored index never exceeds
            // twice the level's width; a width is a difference within one
            // level, and the shift leaves every such difference unchanged.
            long long rebased = pos - it->second.first;
            if (node->right != nullptr)
                stack.push_back({node->right, depth + 1, 2 * rebased + 1});
            if (node->left != nullptr)
                stack.push_back({node->left, depth + 1, 2 * rebased});
        }
        return best;
    }
};
