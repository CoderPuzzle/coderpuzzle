class Solution {
  public:
    TreeNode *createBinaryTree(vector<vector<int>> &descriptions) {
        unordered_map<int, TreeNode *> nodes;
        unordered_set<int> children;
        auto get = [&](int value) -> TreeNode * {
            auto it = nodes.find(value);
            if (it == nodes.end()) {
                it = nodes.emplace(value, new TreeNode(value)).first;
            }
            return it->second;
        };
        for (auto &d : descriptions) {
            children.insert(d[1]);
            if (d[2] == 1) {
                get(d[0])->left = get(d[1]);
            } else {
                get(d[0])->right = get(d[1]);
            }
        }
        for (auto &[value, node] : nodes) {
            if (!children.count(value)) {
                return node;
            }
        }
        return nullptr;
    }
};
