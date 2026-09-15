#include <algorithm>
#include <utility>
#include <vector>

class Solution {
  public:
    int levelMedian(TreeNode *root, int level) {
        // Descend one frontier at a time: every pass replaces the current
        // level's nodes with their children, so after `level` passes the
        // frontier IS the queried level. If it empties first, that level
        // does not exist and -1 is the answer. Plain loops over an
        // explicit frontier — no recursion — so a 200,000-node chain is
        // as safe as a bushy tree.
        std::vector<TreeNode *> frontier;
        if (root != nullptr) {
            frontier.push_back(root);
        }
        for (int depth = 0; depth < level && !frontier.empty(); ++depth) {
            std::vector<TreeNode *> next;
            next.reserve(2 * frontier.size());
            for (TreeNode *node : frontier) {
                if (node->left != nullptr) {
                    next.push_back(node->left);
                }
                if (node->right != nullptr) {
                    next.push_back(node->right);
                }
            }
            frontier = std::move(next);
        }
        if (frontier.empty()) {
            return -1;
        }
        // The upper median sits at index size / 2 of the sorted level
        // values: the exact middle for odd counts, the larger of the two
        // middle elements for even counts.
        std::vector<int> values;
        values.reserve(frontier.size());
        for (TreeNode *node : frontier) {
            values.push_back(node->val);
        }
        std::sort(values.begin(), values.end());
        return values[values.size() / 2];
    }
};
