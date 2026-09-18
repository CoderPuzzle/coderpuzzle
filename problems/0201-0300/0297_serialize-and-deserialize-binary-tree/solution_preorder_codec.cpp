#include <string>
#include <utility>
#include <vector>

class Codec {
  public:
    Codec() {}

    // Preorder codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.

    std::string serialize(TreeNode *root) {
        std::vector<std::string> tokens;
        std::vector<TreeNode *> stack{root};
        // Preorder with an explicit stack: pop a node, emit its value, then
        // push right before left so the left subtree is written first.
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (node == nullptr) {
                tokens.push_back("#");
                continue;
            }
            tokens.push_back(std::to_string(node->val));
            stack.push_back(node->right);
            stack.push_back(node->left);
        }
        // Closing markers tell the replay when a subtree ends, so unlike
        // the breadth-first form nothing here can be trimmed.
        std::string data;
        for (size_t index = 0; index < tokens.size(); index++) {
            if (index > 0) {
                data += ",";
            }
            data += tokens[index];
        }
        return data;
    }

    TreeNode *deserialize(std::string data) {
        std::vector<std::string> tokens;
        size_t start = 0;
        while (start <= data.size()) {
            size_t comma = data.find(',', start);
            if (comma == std::string::npos) {
                tokens.push_back(data.substr(start));
                break;
            }
            tokens.push_back(data.substr(start, comma - start));
            start = comma + 1;
        }
        if (tokens[0] == "#") {
            return nullptr;
        }
        TreeNode *root = new TreeNode(std::stoi(tokens[0]));
        // Open child slots replay preorder: the top slot takes the next
        // token, a marker fills it with nothing, a value makes a node that
        // fills it and opens two slots of its own (right before left).
        std::vector<std::pair<TreeNode *, bool>> pending;
        pending.push_back({root, true});
        pending.push_back({root, false});
        size_t index = 1;
        while (!pending.empty()) {
            auto [node, right] = pending.back();
            pending.pop_back();
            const std::string &token = tokens[index];
            index++;
            if (token == "#") {
                continue;
            }
            TreeNode *child = new TreeNode(std::stoi(token));
            if (right) {
                node->right = child;
            } else {
                node->left = child;
            }
            pending.push_back({child, true});
            pending.push_back({child, false});
        }
        return root;
    }
};
