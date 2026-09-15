class Solution {
  public:
    NodeWithNext *treeToDoublyList(TreeNode *root) {
        vector<NodeWithNext *> nodes;
        vector<TreeNode *> stack;
        TreeNode *node = root;
        while (!stack.empty() || node != nullptr) {
            while (node != nullptr) {
                stack.push_back(node);
                node = node->left;
            }
            node = stack.back();
            stack.pop_back();
            nodes.push_back(new NodeWithNext(node->val));
            node = node->right;
        }
        for (size_t index = 0; index + 1 < nodes.size(); ++index) {
            nodes[index]->right = nodes[index + 1];
            nodes[index + 1]->left = nodes[index];
        }
        if (nodes.empty())
            return nullptr;
        NodeWithNext *head = nodes.front();
        NodeWithNext *tail = nodes.back();
        tail->right = head;
        head->left = tail;
        return head;
    }
};
