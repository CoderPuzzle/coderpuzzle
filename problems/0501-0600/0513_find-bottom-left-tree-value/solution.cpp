class Solution {
  public:
    int findBottomLeftValue(TreeNode *root) {
        // Children enter right-first, so every row drains right-to-left and
        // the last node dequeued overall is the leftmost node of the deepest
        // row: each dequeue overwrites the answer and the final row wins.
        queue<TreeNode *> pending;
        pending.push(root);
        int answer = root->val;
        while (!pending.empty()) {
            TreeNode *node = pending.front();
            pending.pop();
            answer = node->val;
            if (node->right != nullptr) {
                pending.push(node->right);
            }
            if (node->left != nullptr) {
                pending.push(node->left);
            }
        }
        return answer;
    }
};
