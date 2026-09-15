#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    vector<int> findMode(TreeNode *root) {
        // Counting modes never needed the BST ordering: the modes are a
        // property of the multiset of values, whatever order a walk meets
        // them in. So this version takes the tree as an ordinary container
        // — a stack pops a node, tallies its value into an unordered_map
        // keyed by the value itself, and pushes the children — and the
        // table, not adjacency, does the bookkeeping. The traversal
        // carries its own stack of nodes: the tree may be a single
        // 10^4-node chain, whose walk would nest 10000 calls — needlessly
        // at the mercy of the runtime call stack.
        unordered_map<int, int> counts;
        vector<TreeNode *> stack;
        if (root != nullptr) {
            stack.push_back(root);
        }
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            ++counts[node->val];
            if (node->right != nullptr) {
                stack.push_back(node->right);
            }
            if (node->left != nullptr) {
                stack.push_back(node->left);
            }
        }

        // One pass over the table finds the largest count; a second
        // collects every value that reaches it. An unordered_map iterates
        // in arbitrary order — the ascending order the streak walk gets
        // for free from inorder is absent here — so the survivors are
        // sorted once at the end.
        int best = 0;
        for (const auto &entry : counts) {
            best = std::max(best, entry.second);
        }
        vector<int> modes;
        for (const auto &entry : counts) {
            if (entry.second == best) {
                modes.push_back(entry.first);
            }
        }
        std::sort(modes.begin(), modes.end());
        return modes;
    }
};
