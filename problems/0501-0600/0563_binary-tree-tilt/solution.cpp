#include <vector>

class Solution {
  public:
    long long findTilt(TreeNode *root) {
        // Post-order, one pass: by the time a node is settled, both of its
        // subtrees have reported their sums, so its tilt |left - right|
        // falls out of those two numbers — a missing child reports 0 — and
        // the same visit yields the node's own sum for its parent. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose walk would nest 10000 calls —
        // needlessly at the mercy of the runtime call stack.
        long long total_tilt = 0;
        // Every subtree sum stays within 10^4 nodes of 1000 each, so
        // |sum| <= 10^7 fits an int; only the running total of tilts is
        // 64-bit — a 10^4-node one-child chain of 1000s stacks up tilts
        // 0 + 1000 + 2000 + ... to almost 5 * 10^10.
        std::vector<Frame> stack;
        if (root != nullptr) {
            stack.push_back(Frame(root));
        }
        while (!stack.empty()) {
            Frame &frame = stack.back();
            if (frame.state == 0) {
                frame.state = 1;
                if (frame.node->left != nullptr) {
                    stack.push_back(Frame(frame.node->left));
                }
            } else if (frame.state == 1) {
                frame.state = 2;
                if (frame.node->right != nullptr) {
                    stack.push_back(Frame(frame.node->right));
                }
            } else {
                int left = frame.left;
                int right = frame.right;
                int tilt = left - right;
                if (tilt < 0) {
                    tilt = -tilt;
                }
                int total = frame.node->val + left + right;
                stack.pop_back();
                total_tilt += tilt;
                if (!stack.empty()) {
                    Frame &parent = stack.back();
                    // The parent's state tells which subtree just finished:
                    // 1 = its left child, 2 = its right child.
                    if (parent.state == 1) {
                        parent.left = total;
                    } else {
                        parent.right = total;
                    }
                }
            }
        }
        return total_tilt;
    }

  private:
    // A node under traversal, holding the sums of the two subtrees
    // already finished beneath it.
    struct Frame {
        TreeNode *node;
        int state;
        int left;
        int right;

        explicit Frame(TreeNode *node) : node(node), state(0), left(0), right(0) {}
    };
};
