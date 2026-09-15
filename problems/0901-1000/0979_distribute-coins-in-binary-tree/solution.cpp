class Solution {
  public:
    int distributeCoins(TreeNode *root) {
        int moves = 0;
        dfs(root, moves);
        return moves;
    }

  private:
    // Returns the net coin flow out of this subtree.
    int dfs(TreeNode *node, int &moves) {
        if (node == nullptr) {
            return 0;
        }
        int left = dfs(node->left, moves);
        int right = dfs(node->right, moves);
        // Each |excess| is the flow on that child edge; flows on separate
        // edges never interfere, so summing them is the total moves.
        moves += abs(left) + abs(right);
        // Keep one coin for this node; the rest is the parent-bound flow.
        return node->val + left + right - 1;
    }
};
