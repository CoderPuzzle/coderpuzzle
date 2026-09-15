class Solution {
  public:
    int heightOfTree(TreeNode *root) {
        if (root == nullptr)
            return 0;
        // A leaf of the special tree is the one node the display cannot
        // mark: the ring gives every leaf both children, and the previous
        // leaf's right child points back at the leaf itself. A wave only
        // descends from the nodes the test clears, so the ring never
        // joins a wave and every reached node is visited once.
        vector<TreeNode *> frontier{root};
        int height = 0;
        while (true) {
            vector<TreeNode *> wave;
            for (TreeNode *node : frontier) {
                if (node->left != nullptr && node->left->right == node)
                    continue;
                if (node->left != nullptr)
                    wave.push_back(node->left);
                if (node->right != nullptr)
                    wave.push_back(node->right);
            }
            if (wave.empty())
                return height;
            ++height;
            frontier = wave;
        }
    }
};
