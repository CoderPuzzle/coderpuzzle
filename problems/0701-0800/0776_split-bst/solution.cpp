#include <vector>

class Solution {
  public:
    vector<TreeNode *> splitBST(TreeNode *root, int target) {
        // The split boundary is one root-to-null path: step right whenever
        // a node's value is at most target, left whenever it is greater.
        // Only the nodes on that path ever change children — every subtree
        // hanging off it keeps its parent, which is exactly the structure
        // preservation the statement demands.
        TreeNode *smallRoot = nullptr;
        TreeNode *largeRoot = nullptr;
        // Two dangling tails mark where the next path node on each side
        // must attach. A node <= target joins the first tree, and the next
        // small-side node on the path is always its right descendant, so
        // the tail advances to its freshly emptied right child; a node
        // > target mirrors this on the left. Tail pointers-to-pointers
        // stand in for the sentinel nodes — no allocation at all.
        TreeNode **smallTail = &smallRoot;
        TreeNode **largeTail = &largeRoot;
        TreeNode *node = root;
        while (node != nullptr) {
            if (node->val <= target) {
                TreeNode *following = node->right;
                node->right = nullptr;
                *smallTail = node;
                smallTail = &node->right;
                node = following;
            } else {
                TreeNode *following = node->left;
                node->left = nullptr;
                *largeTail = node;
                largeTail = &node->left;
                node = following;
            }
        }
        return {smallRoot, largeRoot};
    }
};
