class Solution {
    struct Entry {
        TreeNode *node;
        int lastIndex;
        int count;
    };

  public:
    vector<TreeNode *> findDuplicateSubtrees(TreeNode *root) {
        unordered_map<string, Entry> info; // serial -> first node, last index, count
        int counter = 0;
        key(root, info, counter);
        vector<Entry> entries;
        entries.reserve(info.size());
        for (const auto &[serial, entry] : info) {
            entries.push_back(entry);
        }
        sort(entries.begin(), entries.end(), [](const Entry &a, const Entry &b) { return a.lastIndex < b.lastIndex; });
        vector<TreeNode *> duplicates;
        for (const Entry &entry : entries) {
            if (entry.count >= 2) {
                duplicates.push_back(entry.node);
            }
        }
        return duplicates;
    }

  private:
    string key(TreeNode *node, unordered_map<string, Entry> &info, int &counter) {
        if (node == nullptr) {
            return "#";
        }
        int index = counter++;
        string serial =
            to_string(node->val) + "," + key(node->left, info, counter) + "," + key(node->right, info, counter);
        auto it = info.find(serial);
        if (it != info.end()) {
            it->second.lastIndex = index;
            it->second.count += 1;
        } else {
            info.emplace(serial, Entry{node, index, 1});
        }
        return serial;
    }
};
