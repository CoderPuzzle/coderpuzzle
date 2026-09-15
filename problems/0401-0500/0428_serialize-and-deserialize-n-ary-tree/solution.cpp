class Solution {
  public:
    string serialize(Node *root) {
        if (root == nullptr)
            return "[]";
        vector<string> tokens;
        tokens.push_back(to_string(root->val));
        tokens.push_back("null");
        deque<Node *> queue{root};
        while (!queue.empty()) {
            Node *node = queue.front();
            queue.pop_front();
            for (Node *child : node->children) {
                tokens.push_back(to_string(child->val));
                queue.push_back(child);
            }
            tokens.push_back("null");
        }
        while (!tokens.empty() && tokens.back() == "null")
            tokens.pop_back();
        string out = "[";
        for (size_t index = 0; index < tokens.size(); ++index) {
            if (index > 0)
                out += ',';
            out += tokens[index];
        }
        return out + "]";
    }
};
