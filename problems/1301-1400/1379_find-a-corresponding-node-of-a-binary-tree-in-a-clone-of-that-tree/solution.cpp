// bundle-provided type (not editable here; the judge assembles its definition
// into every submission):
//   TreeNode:  { int val; TreeNode* left; TreeNode* right; }

class Solution {
  public:
    TreeNode *getTargetCopy(TreeNode *original, TreeNode *cloned, int target) {
        // Parallel preorder: identical shapes keep every pair aligned.
        std::vector<std::pair<TreeNode *, TreeNode *>> stack{{original, cloned}};
        while (!stack.empty()) {
            auto [origNode, cloneNode] = stack.back();
            stack.pop_back();
            if (origNode == nullptr)
                continue;
            if (origNode->val == target)
                return cloneNode;
            stack.push_back({origNode->left, cloneNode->left});
            stack.push_back({origNode->right, cloneNode->right});
        }
        return nullptr;
    }
};
