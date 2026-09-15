#include <vector>

class Solution {
  public:
    int minimumLevel(TreeNode *root) {
        // One breadth-first pass groups nodes level by level; each
        // level's sum competes against the running minimum with a strict
        // less-than, so on a tie the earliest — lowest — level stays the
        // answer. An explicit queue, never recursion: a skewed tree runs
        // 10^5 nodes deep. Level sums reach 10^5 * 10^9 = 10^14, past
        // int range: accumulate in long long.
        int best_level = 1;
        long long best_sum = -1;
        int level = 1;
        std::vector<TreeNode *> pending{root};
        while (!pending.empty()) {
            long long total = 0;
            std::vector<TreeNode *> next;
            for (TreeNode *node : pending) {
                total += node->val;
                if (node->left != nullptr)
                    next.push_back(node->left);
                if (node->right != nullptr)
                    next.push_back(node->right);
            }
            if (best_sum < 0 || total < best_sum) {
                best_sum = total;
                best_level = level;
            }
            pending = std::move(next);
            ++level;
        }
        return best_level;
    }
};
