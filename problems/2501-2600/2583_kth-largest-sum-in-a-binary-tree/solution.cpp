#include <algorithm>
#include <vector>

class Solution {
  public:
    long long kthLargestLevelSum(TreeNode *root, int k) {
        // One breadth-first sweep, swapping a fresh vector in per level —
        // never recursion, since a degenerate tree runs 10^5 nodes deep.
        // A level holds at most 10^5 nodes worth up to 10^6 each, so its
        // sum reaches 10^11 and overflows int: it accumulates in
        // long long.
        std::vector<long long> sums;
        std::vector<TreeNode *> level{root};
        while (!level.empty()) {
            std::vector<TreeNode *> next;
            long long total = 0;
            for (TreeNode *node : level) {
                total += node->val;
                if (node->left != nullptr)
                    next.push_back(node->left);
                if (node->right != nullptr)
                    next.push_back(node->right);
            }
            sums.push_back(total);
            level = std::move(next);
        }
        if ((int)sums.size() < k)
            return -1LL;
        std::sort(sums.begin(), sums.end(), std::greater<long long>());
        return sums[k - 1];
    }
};
