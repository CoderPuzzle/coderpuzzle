class Solution {
  public:
    RandomTreeNode *copyRandomBinaryTree(RandomTreeNode *root) {
        if (root == nullptr)
            return nullptr;
        // Node identity keys the map — values repeat freely — and a clone
        // registered on first visit answers every later reference to the
        // same original, random pointers included.
        std::unordered_map<RandomTreeNode *, RandomTreeNode *> copies;
        return clone(root, copies);
    }

  private:
    RandomTreeNode *clone(RandomTreeNode *node, std::unordered_map<RandomTreeNode *, RandomTreeNode *> &copies) {
        if (node == nullptr)
            return nullptr;
        auto found = copies.find(node);
        if (found != copies.end())
            return found->second;
        RandomTreeNode *copy = new RandomTreeNode(node->val);
        copies[node] = copy;
        copy->left = clone(node->left, copies);
        copy->right = clone(node->right, copies);
        copy->random = clone(node->random, copies);
        return copy;
    }
};
