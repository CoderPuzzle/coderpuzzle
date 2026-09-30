class Solution {
  public:
    bool wordBreak(string s, vector<string> &wordDict) {
        // Trie over the wordDict: nodes own a child map keyed by letter
        // plus the flag marking a node where a word ends. From every
        // reachable position a walk follows s's own characters, so a branch
        // dies at the first character no remaining word shares, and each
        // terminal crossed marks the prefix after it reachable.
        struct TrieNode {
            unordered_map<char, unique_ptr<TrieNode>> children;
            bool end = false;
        };
        TrieNode root;
        for (const string &word : wordDict) {
            TrieNode *node = &root;
            for (char ch : word) {
                auto &child = node->children[ch];
                if (!child) {
                    child = make_unique<TrieNode>();
                }
                node = child.get();
            }
            node->end = true;
        }
        size_t n = s.size();
        vector<bool> reachable(n + 1, false);
        reachable[0] = true;
        for (size_t i = 0; i < n; ++i) {
            if (!reachable[i])
                continue;
            TrieNode *node = &root;
            for (size_t j = i; j < n; ++j) {
                auto found = node->children.find(s[j]);
                if (found == node->children.end())
                    break;
                node = found->second.get();
                // Every terminal on the path ends a word at this depth.
                if (node->end)
                    reachable[j + 1] = true;
            }
        }
        return reachable[n];
    }
};
