class Solution {
  public:
    vector<vector<int>> levelOrder(Node *root) {
        vector<vector<int>> result;
        if (root == nullptr)
            return result;
        vector<Node *> level{root};
        while (!level.empty()) {
            vector<int> values;
            vector<Node *> next;
            for (Node *node : level) {
                values.push_back(node->val);
                for (Node *child : node->children)
                    next.push_back(child);
            }
            result.push_back(values);
            level = next;
        }
        return result;
    }
};
