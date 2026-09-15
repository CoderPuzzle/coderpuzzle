#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    vector<int> distanceK(TreeNode *root, int target, int k) {
        // Distance k counts edges on paths that may climb through parents as
        // well as descend through children, so the answer can spill out of
        // the target's own subtree — a downward search alone cannot reach
        // it. One breadth-first pass from the root records each node's
        // parent and collects every node, which also locates the node
        // carrying the target value.
        unordered_map<TreeNode *, TreeNode *> parents;
        vector<TreeNode *> order;
        if (root != nullptr) {
            order.push_back(root);
        }
        for (std::size_t head = 0; head < order.size(); ++head) {
            TreeNode *node = order[head];
            if (node->left != nullptr) {
                parents[node->left] = node;
                order.push_back(node->left);
            }
            if (node->right != nullptr) {
                parents[node->right] = node;
                order.push_back(node->right);
            }
        }
        TreeNode *start = nullptr;
        for (TreeNode *node : order) {
            if (node->val == target) {
                start = node;
                break;
            }
        }

        // A level-synchronized walk from the target spreads one edge per step
        // through parent, left child, and right child, never revisiting a
        // node, so after k steps the frontier holds exactly the nodes at
        // distance k. Sorting the collected values settles the ascending
        // output order the statement pins.
        vector<TreeNode *> frontier;
        frontier.push_back(start);
        unordered_set<TreeNode *> seen;
        seen.insert(start);
        for (int step = 0; step < k; ++step) {
            vector<TreeNode *> reached;
            for (TreeNode *node : frontier) {
                auto entry = parents.find(node);
                if (entry != parents.end()) {
                    TreeNode *parent = entry->second;
                    if (seen.insert(parent).second) {
                        reached.push_back(parent);
                    }
                }
                if (node->left != nullptr && seen.insert(node->left).second) {
                    reached.push_back(node->left);
                }
                if (node->right != nullptr && seen.insert(node->right).second) {
                    reached.push_back(node->right);
                }
            }
            frontier = reached;
            if (frontier.empty()) {
                break;
            }
        }
        vector<int> result;
        result.reserve(frontier.size());
        for (TreeNode *node : frontier) {
            result.push_back(node->val);
        }
        sort(result.begin(), result.end());
        return result;
    }
};
