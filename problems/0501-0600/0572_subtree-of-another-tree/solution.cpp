class Solution {
  public:
    bool isSubtree(TreeNode *root, TreeNode *subRoot) {
        // A subtree hangs from some node of root and takes every descendant
        // below it, so the question splits in two: an equality test that
        // settles whether two trees agree in value and shape, and an anchor
        // walk that tries that test rooted at every node of root. Both walks
        // carry their own stacks: a skewed 2000-node root would nest 2000
        // calls — past CPython's default recursion limit of 1000 — and a
        // 1000-node subRoot chain would sit exactly at that edge, so every
        // runtime iterates instead. The anchor walk pops a node, tries the
        // test rooted there, and stacks its children; the first accepting
        // anchor answers the whole question.
        vector<TreeNode *> anchors{root};
        while (!anchors.empty()) {
            TreeNode *node = anchors.back();
            anchors.pop_back();
            if (sameTree(node, subRoot))
                return true;
            if (node->left != nullptr)
                anchors.push_back(node->left);
            if (node->right != nullptr)
                anchors.push_back(node->right);
        }
        return false;
    }

  private:
    // One stack entry settles one aligned node pair: two missing subtrees
    // match, exactly one missing is a shape difference no value can repair —
    // `left == right` holds only when both are null — and when both exist
    // their values must agree here while both child pairs join the stack for
    // the same treatment. An exhausted stack means every pair agreed.
    bool sameTree(TreeNode *a, TreeNode *b) {
        vector<pair<TreeNode *, TreeNode *>> pending{{a, b}};
        while (!pending.empty()) {
            auto [left, right] = pending.back();
            pending.pop_back();
            if (left == nullptr || right == nullptr) {
                if (left != right)
                    return false;
                continue;
            }
            if (left->val != right->val)
                return false;
            pending.push_back({left->left, right->left});
            pending.push_back({left->right, right->right});
        }
        return true;
    }
};
