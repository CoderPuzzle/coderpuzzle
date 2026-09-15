#include <algorithm>
#include <unordered_map>
#include <utility>
#include <vector>

class Solution {
  public:
    int countGreatEnoughNodes(TreeNode *root, int k) {
        // Post-order over an explicit stack: each node yields the sorted
        // list of its subtree's min(size, k) smallest values. The pooled
        // child lists plus the node's own value are sorted and truncated,
        // so a full subtree listing is never needed. The kept list reaches
        // length k exactly when the subtree holds at least k nodes, and its
        // last entry is then the subtree's k-th smallest value counted with
        // multiplicity: the node exceeds it iff at least k actual nodes are
        // strictly smaller — duplicates of the node itself never pass.
        int great = 0;
        if (root == nullptr) {
            return 0;
        }
        std::size_t need = static_cast<std::size_t>(k);
        unordered_map<TreeNode *, vector<int>> smallest;
        vector<pair<TreeNode *, bool>> stack;
        stack.push_back({root, false});
        while (!stack.empty()) {
            pair<TreeNode *, bool> top = stack.back();
            stack.pop_back();
            TreeNode *node = top.first;
            if (!top.second) {
                stack.push_back({node, true});
                if (node->left != nullptr) {
                    stack.push_back({node->left, false});
                }
                if (node->right != nullptr) {
                    stack.push_back({node->right, false});
                }
                continue;
            }
            vector<int> pooled{node->val};
            for (TreeNode *child : {node->left, node->right}) {
                auto it = smallest.find(child);
                if (it != smallest.end()) {
                    pooled.insert(pooled.end(), it->second.begin(), it->second.end());
                    smallest.erase(it);
                }
            }
            sort(pooled.begin(), pooled.end());
            if (pooled.size() > need) {
                pooled.resize(need);
            }
            smallest[node] = std::move(pooled);
            if (smallest[node].size() == need && node->val > smallest[node].back()) {
                great++;
            }
        }
        return great;
    }
};
