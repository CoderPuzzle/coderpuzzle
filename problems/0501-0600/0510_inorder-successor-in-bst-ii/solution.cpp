class Solution {
  public:
    NodeWithNext *inorderSuccessor(NodeWithNext *tree, int node) {
        NodeWithNext *target = nullptr;
        vector<NodeWithNext *> stack;
        if (tree != nullptr)
            stack.push_back(tree);
        while (!stack.empty() && target == nullptr) {
            NodeWithNext *current = stack.back();
            stack.pop_back();
            if (current->val == node)
                target = current;
            if (current->left != nullptr)
                stack.push_back(current->left);
            if (current->right != nullptr)
                stack.push_back(current->right);
        }
        if (target == nullptr)
            return nullptr;
        if (target->right != nullptr) {
            NodeWithNext *successor = target->right;
            while (successor->left != nullptr)
                successor = successor->left;
            return successor;
        }
        while (target->parent != nullptr && target->parent->left != target) {
            target = target->parent;
        }
        return target->parent;
    }
};
