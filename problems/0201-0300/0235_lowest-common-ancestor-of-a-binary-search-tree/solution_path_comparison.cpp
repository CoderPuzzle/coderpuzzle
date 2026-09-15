class Solution {
    // The ordering walks a target home in a straight line: every node
    // recorded is a strict ancestor-or-self of the target.
    vector<int> pathTo(TreeNode *root, int target) {
        vector<int> path;
        TreeNode *node = root;
        while (node->val != target) {
            path.push_back(node->val);
            node = target < node->val ? node->left : node->right;
        }
        path.push_back(target);
        return path;
    }

  public:
    int lowestCommonAncestor(TreeNode *root, int p, int q) {
        // Two written-down paths instead of one simultaneous descent.
        vector<int> first = pathTo(root, p);
        vector<int> second = pathTo(root, q);
        // Shared entries are exactly the shared ancestors; read both lists
        // in lockstep until they split (or one ends, when one target sits
        // above the other) and report the last value they agreed on.
        int answer = first[0];
        for (size_t i = 0; i < first.size() && i < second.size(); i++) {
            if (first[i] != second[i]) {
                break;
            }
            answer = first[i];
        }
        return answer;
    }
};
