#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int findClosestLeaf(TreeNode *root, int k) {
        // Distance here runs over the tree's edges as an undirected graph:
        // the nearest leaf may sit in another subtree, up through parents
        // and across the root, so a descending search alone cannot prove a
        // leaf nearest. One breadth-first pass from the root records each
        // node's parent and collects every node, which also locates k.
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
        TreeNode *target = nullptr;
        for (TreeNode *node : order) {
            if (node->val == k) {
                target = node;
                break;
            }
        }

        // A level-synchronized walk from the k node spreads one edge per
        // step through parent, left child, and right child. The first
        // level holding a leaf holds every nearest leaf; the smallest
        // value among them settles the tie rule.
        vector<TreeNode *> frontier;
        frontier.push_back(target);
        unordered_set<TreeNode *> seen;
        seen.insert(target);
        while (true) {
            int best = 0;
            bool leafFound = false;
            for (TreeNode *node : frontier) {
                if (node->left == nullptr && node->right == nullptr && (!leafFound || node->val < best)) {
                    best = node->val;
                    leafFound = true;
                }
            }
            if (leafFound) {
                return best;
            }
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
        }
    }
};
