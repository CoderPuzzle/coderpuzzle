class Solution {
  public:
    int widthOfBinaryTree(TreeNode *root) {
        int best = 0;
        queue<pair<TreeNode *, long long>> q;
        if (root != nullptr) {
            q.push({root, 0});
        }
        while (!q.empty()) {
            // The queue holds exactly one level, in index order, so its
            // end nodes' indices give the level's width directly — the
            // null slots between them are counted by the arithmetic,
            // never materialized.
            long long width = q.back().second - q.front().second + 1;
            if (width > best) {
                best = (int)width;
            }
            // Re-base before doubling: raw heap indices double per level
            // and blow past 64 bits on a deep chain. Shifted so the level
            // starts at 0, a stored index never exceeds twice the level's
            // width; a width is a difference within one level, and the
            // shift leaves every such difference unchanged.
            long long base = q.front().second;
            int remaining = (int)q.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode *node = q.front().first;
                long long index = q.front().second - base;
                q.pop();
                if (node->left != nullptr)
                    q.push({node->left, 2 * index});
                if (node->right != nullptr)
                    q.push({node->right, 2 * index + 1});
            }
        }
        return best;
    }
};
