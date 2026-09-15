class Solution {
  public:
    RandomTreeNode *copyRandomBinaryTree(RandomTreeNode *root) {
        if (root == nullptr)
            return nullptr;
        // Weave: every original node's left slot comes to hold its own clone,
        // and the clone's left holds the original's former left child, so the
        // original structure stays walkable one step down.
        std::vector<RandomTreeNode *> stack{root};
        while (!stack.empty()) {
            RandomTreeNode *node = stack.back();
            stack.pop_back();
            RandomTreeNode *clone = new RandomTreeNode(node->val);
            RandomTreeNode *left = node->left;
            clone->left = left;
            node->left = clone;
            if (left != nullptr)
                stack.push_back(left);
            if (node->right != nullptr)
                stack.push_back(node->right);
        }
        // Far links: an original's clone is node->left, so the clone of
        // anything the original points across to — its random target and
        // its right child — is that target's own left.
        stack.push_back(root);
        while (!stack.empty()) {
            RandomTreeNode *node = stack.back();
            stack.pop_back();
            RandomTreeNode *clone = node->left;
            if (node->random != nullptr)
                clone->random = node->random->left;
            RandomTreeNode *right = node->right;
            if (right != nullptr) {
                clone->right = right->left;
                stack.push_back(right);
            }
            if (clone->left != nullptr)
                stack.push_back(clone->left);
        }
        RandomTreeNode *answer = root->left;
        // Split: restore each original's left child and hand the clone the
        // clone of that subtree.
        stack.push_back(root);
        while (!stack.empty()) {
            RandomTreeNode *node = stack.back();
            stack.pop_back();
            RandomTreeNode *clone = node->left;
            RandomTreeNode *left = clone->left;
            clone->left = left == nullptr ? nullptr : left->left;
            node->left = left;
            if (left != nullptr)
                stack.push_back(left);
            if (node->right != nullptr)
                stack.push_back(node->right);
        }
        return answer;
    }
};
