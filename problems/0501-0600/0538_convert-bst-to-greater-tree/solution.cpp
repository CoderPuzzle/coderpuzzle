#include <vector>

class Solution {
  public:
    TreeNode *convertBST(TreeNode *root) {
        // Reverse inorder — right subtree, node, left subtree — visits a
        // BST's keys in strictly descending order, so when the walk
        // reaches a node, every key greater than it has already been
        // seen. The running total the walk carries is therefore exactly
        // the node's new value: the original key plus the sum of all
        // greater keys. Add the key to the total, write the total back,
        // and move on — no second pass, no per-node search. The traversal
        // carries its own stack of nodes: the tree may be a single 10^4-
        // node chain, whose walk would nest 10000 calls — needlessly at
        // the mercy of the runtime call stack. Keys lie in [-10^4, 10^4]
        // and are unique, so the total never passes 50005000 in
        // magnitude; int holds it with room to spare.
        int total = 0;
        vector<TreeNode *> stack;
        TreeNode *current = root;
        while (current != nullptr || !stack.empty()) {
            // Descend the right spine stacking every node, then visit each
            // popped node and descend its left child.
            while (current != nullptr) {
                stack.push_back(current);
                current = current->right;
            }
            current = stack.back();
            stack.pop_back();
            total += current->val;
            current->val = total;
            current = current->left;
        }
        return root;
    }
};
