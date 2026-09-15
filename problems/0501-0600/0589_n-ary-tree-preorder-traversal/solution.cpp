class Solution {
  public:
    vector<int> preorder(Node *root) {
        vector<int> out;
        if (root == nullptr)
            return out;
        vector<Node *> stack{root};
        while (!stack.empty()) {
            Node *node = stack.back();
            stack.pop_back();
            out.push_back(node->val);
            for (auto it = node->children.rbegin(); it != node->children.rend(); ++it) {
                stack.push_back(*it);
            }
        }
        return out;
    }
};
