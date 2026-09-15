#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int maxSum(TreeNode *root) {
        // Parent pointers let the DFS move up as well as down. Trying every
        // node as a path start, the search only enters a neighbor whose value
        // is not already on the current path — the seen set alone blocks the
        // way back to the parent, since the parent is always on the path.
        // Iterative with enter/exit markers, so a 1000-node chain cannot
        // blow the call stack.
        std::unordered_map<TreeNode *, TreeNode *> parent;
        parent[root] = nullptr;
        std::vector<TreeNode *> nodes;
        std::vector<TreeNode *> pending;
        pending.push_back(root);
        while (!pending.empty()) {
            TreeNode *node = pending.back();
            pending.pop_back();
            nodes.push_back(node);
            if (node->left != nullptr) {
                parent[node->left] = node;
                pending.push_back(node->left);
            }
            if (node->right != nullptr) {
                parent[node->right] = node;
                pending.push_back(node->right);
            }
        }
        int best = -1000000000;
        for (TreeNode *start : nodes) {
            std::unordered_set<int> seen;
            // (node, sum, phase) — phase 0 enter, 1 exit
            std::vector<std::tuple<TreeNode *, int, int>> st;
            st.push_back({start, start->val, 0});
            while (!st.empty()) {
                auto [node, s, phase] = st.back();
                st.pop_back();
                if (phase == 1) {
                    seen.erase(node->val);
                    continue;
                }
                seen.insert(node->val);
                if (s > best) {
                    best = s;
                }
                st.push_back({node, s, 1});
                TreeNode *neighbors[3] = {node->left, node->right, parent[node]};
                for (TreeNode *next : neighbors) {
                    if (next != nullptr && seen.find(next->val) == seen.end()) {
                        st.push_back({next, s + next->val, 0});
                    }
                }
            }
        }
        return best;
    }
};
