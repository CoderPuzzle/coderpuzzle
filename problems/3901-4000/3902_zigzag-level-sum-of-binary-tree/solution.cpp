#include <utility>
#include <vector>

class Solution {
  public:
    std::vector<long long> zigzagLevelSum(TreeNode *root) {
        std::vector<TreeNode *> frontier{root};
        std::vector<long long> answer;
        bool odd = true;
        while (!frontier.empty()) {
            long long total = 0;
            for (int step = 0; step < (int)frontier.size(); ++step) {
                int index = odd ? step : frontier.size() - 1 - step;
                TreeNode *node = frontier[index];
                TreeNode *required = odd ? node->left : node->right;
                if (required == nullptr)
                    break;
                total += node->val;
            }
            answer.push_back(total);
            std::vector<TreeNode *> next;
            next.reserve(2 * frontier.size());
            for (TreeNode *node : frontier) {
                if (node->left != nullptr)
                    next.push_back(node->left);
                if (node->right != nullptr)
                    next.push_back(node->right);
            }
            frontier = std::move(next);
            odd = !odd;
        }
        return answer;
    }
};
