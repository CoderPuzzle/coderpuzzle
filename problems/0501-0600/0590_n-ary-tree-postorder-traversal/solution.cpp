class Solution {
  public:
    vector<int> postorder(Node *root) {
        vector<int> out;
        if (root == nullptr)
            return out;
        vector<pair<Node *, size_t>> stack{{root, 0}};
        while (!stack.empty()) {
            auto &[node, index] = stack.back();
            if (index < node->children.size()) {
                Node *child = node->children[index];
                index += 1;
                stack.push_back({child, 0});
            } else {
                out.push_back(node->val);
                stack.pop_back();
            }
        }
        return out;
    }
};
