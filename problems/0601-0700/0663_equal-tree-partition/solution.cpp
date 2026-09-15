#include <unordered_set>
#include <vector>

class Solution {
  public:
    bool checkEqualTree(TreeNode *root) {
        // Removing one edge detaches exactly one subtree; the two parts are
        // that subtree and everything else, so the split is equal exactly
        // when some subtree sums to half of the whole tree's total. One
        // post-order pass computes every subtree sum, and the root's own
        // sum, the last to finish, is that total. The traversal carries its
        // own stack of frames: the tree may be a single 10^4-node chain,
        // whose walk would nest 10000 calls — needlessly at the mercy of
        // the runtime call stack.
        std::unordered_set<long long> sums;
        long long total = 0;
        // Sums reach 10^4 nodes of 10^5 each — |sum| up to 10^9, at the
        // very rim of a 32-bit int — so accumulation is 64-bit throughout.
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
                total = static_cast<long long>(frame.node->val) + frame.left + frame.right;
                stack.pop_back();
                if (!stack.empty()) {
                    // A parent still waits above, so this was a proper
                    // subtree — the only cut candidates. The whole tree
                    // never counts as a part: with total 0 the root's own
                    // sum would match its half spuriously.
                    sums.insert(total);
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
        // An odd total never halves into integers — parity still bites
        // with negatives (-9 is as odd as 9).
        return total % 2 == 0 && sums.count(total / 2) > 0;
    }

  private:
    // A node under traversal, holding the sums of the two subtrees
    // already finished beneath it.
    struct Frame {
        TreeNode *node;
        int state;
        long long left;
        long long right;

        explicit Frame(TreeNode *node) : node(node), state(0), left(0), right(0) {}
    };
};
