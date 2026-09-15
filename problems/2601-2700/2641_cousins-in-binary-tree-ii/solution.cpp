#include <vector>

class Solution {
  public:
    TreeNode *replaceValueInTree(TreeNode *root) {
        // A node's new value is (sum of its level) - (its own original value
        // plus its sibling's). Two-phase breadth-first passes read a whole
        // level of children with their original values first — recording
        // where each parent's sibling group ends — then write the cousin
        // sums back group by group. Iterative on purpose: chains can run
        // 10^5 nodes deep, far past comfortable recursion. Level sums stay
        // below 10^5 * 10^4, but long long keeps the additions worry-free.
        vector<TreeNode *> row{root};
        root->val = 0;
        while (!row.empty()) {
            vector<TreeNode *> children;
            vector<size_t> ends;
            long long child_sum = 0;
            for (TreeNode *node : row) {
                if (node->left != nullptr) {
                    children.push_back(node->left);
                    child_sum += node->left->val;
                }
                if (node->right != nullptr) {
                    children.push_back(node->right);
                    child_sum += node->right->val;
                }
                ends.push_back(children.size());
            }
            size_t index = 0;
            for (size_t end : ends) {
                if (end > index) {
                    long long pair_sum = 0;
                    for (size_t k = index; k < end; ++k)
                        pair_sum += children[k]->val;
                    long long new_value = child_sum - pair_sum;
                    for (size_t k = index; k < end; ++k)
                        children[k]->val = (int)new_value;
                }
                index = end;
            }
            row = move(children);
        }
        return root;
    }
};
