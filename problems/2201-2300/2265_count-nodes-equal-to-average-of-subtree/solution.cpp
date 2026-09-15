#include <unordered_map>
#include <vector>
using namespace std;

// Definition for a binary tree node is provided by the judge.

class Solution {
  public:
    int averageOfSubtree(TreeNode *root) {
        // Iterative post-order: frames carry (node, children pending).
        vector<pair<TreeNode *, bool>> stack{{root, false}};
        unordered_map<TreeNode *, long long> sums;
        unordered_map<TreeNode *, int> sizes;
        int count = 0;
        while (!stack.empty()) {
            auto [node, visited] = stack.back();
            stack.pop_back();
            if (node == nullptr) {
                continue;
            }
            if (visited) {
                long long s = node->val;
                int n = 1;
                if (node->left != nullptr) {
                    s += sums[node->left];
                    n += sizes[node->left];
                }
                if (node->right != nullptr) {
                    s += sums[node->right];
                    n += sizes[node->right];
                }
                sums[node] = s;
                sizes[node] = n;
                if (s / n == node->val) {
                    count++;
                }
            } else {
                stack.push_back({node, true});
                if (node->left != nullptr) {
                    stack.push_back({node->left, false});
                }
                if (node->right != nullptr) {
                    stack.push_back({node->right, false});
                }
            }
        }
        return count;
    }
};
