class Solution {
  public:
    int diameter(Node *root) {
        if (root == nullptr)
            return 0;
        int best = 0;
        // height() folds the widest bend -- the two tallest child arms
        // through some node plus the two edges that join them -- into best.
        height(root, best);
        return best;
    }

  private:
    // Returns the node's height -- its longest downward arm in edges.
    static int height(Node *node, int &best) {
        int first = -1, second = -1;
        for (Node *child : node->children) {
            int arm = height(child, best);
            if (arm > first) {
                second = first;
                first = arm;
            } else if (arm > second) {
                second = arm;
            }
        }
        best = max(best, first + second + 2);
        return first + 1;
    }
};
