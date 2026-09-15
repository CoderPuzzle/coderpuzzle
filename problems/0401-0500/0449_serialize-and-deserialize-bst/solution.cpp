#include <string>
#include <vector>

// Preorder with null markers: the root's value, then its left subtree, then
// its right, `x` for every absent child, joined by commas.
class Codec {
  public:
    string serialize(TreeNode *root) {
        string out;
        vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (!out.empty())
                out += ',';
            if (node == nullptr) {
                out += 'x';
            } else {
                out += to_string(node->val);
                stack.push_back(node->right);
                stack.push_back(node->left);
            }
        }
        return out;
    }

    // The mirror build: each stack entry is a node with one open child slot
    // (left before right); a value fills the slot and opens two more, an
    // `x` just closes it.
    TreeNode *deserialize(string data) {
        vector<string> tokens = split(data);
        if (tokens[0] == "x")
            return nullptr;
        TreeNode *root = new TreeNode(stoi(tokens[0]));
        vector<Open> stack{{root, true}};
        for (size_t index = 1; index < tokens.size(); index++) {
            Open open = stack.back();
            stack.pop_back();
            TreeNode *child = tokens[index] == "x" ? nullptr : new TreeNode(stoi(tokens[index]));
            if (open.wants_left) {
                open.node->left = child;
                stack.push_back({open.node, false});
            } else {
                open.node->right = child;
            }
            if (child != nullptr)
                stack.push_back({child, true});
        }
        return root;
    }

  private:
    struct Open {
        TreeNode *node;
        bool wants_left;
    };

    static vector<string> split(const string &data) {
        vector<string> tokens;
        string token;
        for (char piece : data) {
            if (piece == ',') {
                tokens.push_back(token);
                token.clear();
            } else {
                token += piece;
            }
        }
        tokens.push_back(token);
        return tokens;
    }
};
