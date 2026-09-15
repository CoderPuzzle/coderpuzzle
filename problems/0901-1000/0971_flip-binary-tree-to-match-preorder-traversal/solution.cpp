#include <vector>

class Solution {
  public:
    vector<int> flipMatchVoyage(TreeNode *root, vector<int> &voyage) {
        // The walk and the voyage run in lockstep: a preorder descent that
        // consumes one voyage value per node and, whenever the next value
        // names the right child rather than the left, flips the current
        // node and records it. Values are unique, so each flip decision is
        // forced — the recorded set is the smallest one, listed in the
        // order the resulting preorder meets the flipped nodes. Any
        // disagreement, or voyage entries left over, means no flip set
        // works: [-1].
        vector<int> flips;
        vector<TreeNode *> pending;
        if (root != nullptr) {
            pending.push_back(root);
        }
        size_t cursor = 0;
        while (!pending.empty()) {
            TreeNode *node = pending.back();
            pending.pop_back();
            if (cursor == voyage.size() || voyage[cursor] != node->val) {
                return {-1};
            }
            ++cursor;
            TreeNode *left = node->left;
            TreeNode *right = node->right;
            if (left != nullptr && (cursor == voyage.size() || voyage[cursor] != left->val)) {
                flips.push_back(node->val);
                TreeNode *swap = left;
                left = right;
                right = swap;
            }
            if (right != nullptr)
                pending.push_back(right);
            if (left != nullptr)
                pending.push_back(left);
        }
        if (cursor != voyage.size()) {
            return {-1};
        }
        return flips;
    }
};
