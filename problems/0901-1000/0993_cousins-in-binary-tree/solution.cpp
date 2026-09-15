#include <vector>

class Solution {
  public:
    bool isCousins(TreeNode *root, int x, int y) {
        // Cousinhood is a fact about two coordinates, not about either node
        // alone: the depth a node sits at and the parent it hangs from. One
        // descent — an explicit stack whose frames are (node, depth, parent
        // value) — records both coordinates for the nodes valued x and y,
        // and stops the moment the second of them is met. The verdict then
        // reads straight off the records: same depth, different parents.
        // The root rides with the sentinel parent 0, harmless because no
        // node value is 0 and the root is alone at depth 0.
        int depth_x = -1;
        int depth_y = -1;
        int parent_x = 0;
        int parent_y = 0;
        struct Frame {
            TreeNode *node;
            int depth;
            int parent;
        };
        vector<Frame> pending;
        pending.push_back({root, 0, 0});
        while (!pending.empty()) {
            Frame frame = pending.back();
            pending.pop_back();
            if (frame.node == nullptr) {
                continue;
            }
            if (frame.node->val == x) {
                depth_x = frame.depth;
                parent_x = frame.parent;
            } else if (frame.node->val == y) {
                depth_y = frame.depth;
                parent_y = frame.parent;
            }
            if (depth_x >= 0 && depth_y >= 0) {
                break;
            }
            if (frame.node->right != nullptr) {
                pending.push_back({frame.node->right, frame.depth + 1, frame.node->val});
            }
            if (frame.node->left != nullptr) {
                pending.push_back({frame.node->left, frame.depth + 1, frame.node->val});
            }
        }
        return depth_x == depth_y && parent_x != parent_y;
    }
};
