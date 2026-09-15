class Solution {
  public:
    int rob(TreeNode *root) {
        // Two independent questions per subtree, each with its own memo
        // table: the best with the root chosen, and the best with the root
        // barred. Asking them separately can re-descend a subtree, but the
        // tables make sure each question is settled once per node.
        unordered_map<TreeNode *, int> takeMap;
        unordered_map<TreeNode *, int> skipMap;
        return max(take(root, takeMap, skipMap), skip(root, takeMap, skipMap));
    }

  private:
    int take(TreeNode *node, unordered_map<TreeNode *, int> &takeMap, unordered_map<TreeNode *, int> &skipMap) {
        if (node == nullptr) {
            return 0;
        }
        auto cached = takeMap.find(node);
        if (cached != takeMap.end()) {
            return cached->second;
        }
        // Taking this node bars both children outright.
        int best = node->val + skip(node->left, takeMap, skipMap) + skip(node->right, takeMap, skipMap);
        takeMap[node] = best;
        return best;
    }

    int skip(TreeNode *node, unordered_map<TreeNode *, int> &takeMap, unordered_map<TreeNode *, int> &skipMap) {
        if (node == nullptr) {
            return 0;
        }
        auto cached = skipMap.find(node);
        if (cached != skipMap.end()) {
            return cached->second;
        }
        // Each child keeps its better option.
        int best = max(take(node->left, takeMap, skipMap), skip(node->left, takeMap, skipMap)) +
                   max(take(node->right, takeMap, skipMap), skip(node->right, takeMap, skipMap));
        skipMap[node] = best;
        return best;
    }
};
