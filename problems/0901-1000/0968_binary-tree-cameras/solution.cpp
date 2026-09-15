class Solution {
  public:
    int minCameraCover(TreeNode *root) {
        int cameras = 0;
        if (dfs(root, cameras) == 0) {
            cameras++;
        }
        return cameras;
    }

  private:
    // State: 0 = uncovered, 1 = has camera, 2 = covered.
    int dfs(TreeNode *node, int &cameras) {
        if (node == nullptr) {
            // Null reports covered so leaves start uncovered and push
            // the first camera one level up.
            return 2;
        }
        int left = dfs(node->left, cameras);
        int right = dfs(node->right, cameras);
        if (left == 0 || right == 0) {
            // An uncovered child forces a camera here — the parent of
            // an uncovered node is always the best placement.
            cameras++;
            return 1;
        }
        if (left == 1 || right == 1) {
            return 2;
        }
        return 0;
    }
};
