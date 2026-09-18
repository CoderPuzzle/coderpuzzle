#include <string>
#include <vector>

class Codec {
  public:
    Codec() {}

    // Level-order codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.
    std::string serialize(TreeNode *root) {
        std::vector<std::string> tokens;
        std::vector<TreeNode *> queue{root};
        // The queue holds nulls too: a null emits a marker and enqueues
        // nothing, so every child slot gets exactly one token.
        for (size_t head = 0; head < queue.size(); head++) {
            TreeNode *node = queue[head];
            if (node == nullptr) {
                tokens.push_back("#");
                continue;
            }
            tokens.push_back(std::to_string(node->val));
            queue.push_back(node->left);
            queue.push_back(node->right);
        }
        // Trailing markers only mark absent slots, so trimming them keeps
        // the sequence uniquely recoverable.
        size_t end = tokens.size();
        while (end > 0 && tokens[end - 1] == "#") {
            end--;
        }
        std::string data;
        for (size_t index = 0; index < end; index++) {
            if (index > 0) {
                data += ",";
            }
            data += tokens[index];
        }
        return data;
    }

    TreeNode *deserialize(std::string data) {
        if (data.empty()) {
            return nullptr;
        }
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
        TreeNode *root = new TreeNode(std::stoi(tokens[0]));
        std::vector<TreeNode *> queue{root};
        size_t index = 1;
        // Consume tokens as child slots in queue order; a marker fills the
        // slot without adding a node to the queue.
        for (size_t head = 0; head < queue.size() && index < tokens.size(); head++) {
            TreeNode *node = queue[head];
            if (index < tokens.size()) {
                const std::string &token = tokens[index++];
                if (token != "#") {
                    node->left = new TreeNode(std::stoi(token));
                    queue.push_back(node->left);
                }
            }
            if (index < tokens.size()) {
                const std::string &token = tokens[index++];
                if (token != "#") {
                    node->right = new TreeNode(std::stoi(token));
                    queue.push_back(node->right);
                }
            }
        }
        return root;
    }
};
