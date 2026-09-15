#include <unordered_map>
#include <vector>

// bundle-provided type (not editable here; the judge assembles its definition
// into every submission):
//   TreeNode:  { int val; TreeNode* left; TreeNode* right; }

class Solution {
  public:
    int longestZigZag(TreeNode *root) {
        if (root == nullptr)
            return 0;

        // Iterative post-order: state 0 expands children, state 1 combines.
        // runs stores each node's [left-arrival, right-arrival] run lengths.
        int best = 0;
        std::unordered_map<TreeNode *, std::pair<int, int>> runs;
        std::vector<std::pair<TreeNode *, int>> stack{{root, 0}};
        while (!stack.empty()) {
            auto [node, state] = stack.back();
            stack.pop_back();
            if (state == 1) {
                int leftRun = node->left != nullptr ? 1 + runs[node->left].second : 0;
                int rightRun = node->right != nullptr ? 1 + runs[node->right].first : 0;
                runs[node] = {leftRun, rightRun};
                best = std::max(best, std::max(leftRun, rightRun));
                continue;
            }
            stack.push_back({node, 1});
            if (node->left != nullptr)
                stack.push_back({node->left, 0});
            if (node->right != nullptr)
                stack.push_back({node->right, 0});
        }
        return best;
    }
};
