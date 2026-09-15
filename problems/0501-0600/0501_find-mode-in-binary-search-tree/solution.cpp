#include <functional>
#include <vector>

class Solution {
  public:
    vector<int> findMode(TreeNode *root) {
        // An inorder walk of a BST emits values in ascending order, so all
        // copies of a value sit next to each other: a mode is just the
        // longest run of equal values in that walk. Two passes find it
        // without ever storing a table of counts. The traversal carries its
        // own stack of nodes: the tree may be a single 10^4-node chain,
        // whose walk would nest 10000 calls — needlessly at the mercy of
        // the runtime call stack.
        // Pass one measures the longest streak; nothing else is remembered,
        // so no table of counts is ever stored.
        int maxStreak = 0;
        int streak = 0;
        int prev = 0;
        bool hasPrev = false;
        inorder(root, [&](int value) {
            streak = (hasPrev && prev == value) ? streak + 1 : 1;
            hasPrev = true;
            prev = value;
            if (streak > maxStreak) {
                maxStreak = streak;
            }
        });

        // Pass two re-walks and emits a value exactly when its streak
        // reaches the maximum — once per mode, in ascending order.
        vector<int> modes;
        streak = 0;
        hasPrev = false;
        inorder(root, [&](int value) {
            streak = (hasPrev && prev == value) ? streak + 1 : 1;
            hasPrev = true;
            prev = value;
            if (streak == maxStreak) {
                modes.push_back(value);
            }
        });
        return modes;
    }

  private:
    // Iterative inorder: descend the left spine stacking every node, then
    // emit each popped node and descend its right child.
    void inorder(TreeNode *root, const std::function<void(int)> &visit) {
        vector<TreeNode *> stack;
        TreeNode *current = root;
        while (current != nullptr || !stack.empty()) {
            while (current != nullptr) {
                stack.push_back(current);
                current = current->left;
            }
            current = stack.back();
            stack.pop_back();
            visit(current->val);
            current = current->right;
        }
    }
};
