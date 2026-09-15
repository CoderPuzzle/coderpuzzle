#include <algorithm>
#include <climits>
#include <vector>

class Solution {
  public:
    int largestBSTSubtree(TreeNode *root) {
        // Post-order, one pass: every subtree reports whether it is a BST,
        // its size, and its min/max value; a node is a BST exactly when
        // both children are BSTs and left.max < node.val < right.min, so
        // each node is judged from its two child reports alone. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose judgement nests 10000 calls —
        // needlessly at the mercy of the runtime call stack.
        int best = 0;
        // Frame = a node, which child remains to visit (0 = left pending,
        // 1 = right pending, 2 = ready to judge), and the two child
        // reports already collected.
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
                Report report = judge(frame);
                stack.pop_back();
                if (report.bst && report.size > best) {
                    best = report.size;
                }
                if (!stack.empty()) {
                    Frame &parent = stack.back();
                    if (parent.state == 1) {
                        parent.left = report;
                    } else {
                        parent.right = report;
                    }
                }
            }
        }
        return best;
    }

  private:
    // A subtree's verdict: whether it is a BST, its size, and its range.
    struct Report {
        bool bst;
        int size;
        int min;
        int max;
    };

    // A node under judgement, accumulating its children's reports.
    struct Frame {
        TreeNode *node;
        int state;
        Report left;
        Report right;

        explicit Frame(TreeNode *node) : node(node), state(0), left(EMPTY), right(EMPTY) {}
    };

    // An absent child is an empty BST: size 0, and never a violation at
    // its parent — the ±sentinel range makes both bounds checks pass.
    inline static constexpr Report EMPTY{true, 0, INT_MAX, INT_MIN};

    // Judge one node from the two reports its children produced.
    static Report judge(const Frame &frame) {
        TreeNode *node = frame.node;
        Report left = frame.left;
        Report right = frame.right;
        if (!left.bst || !right.bst || left.max >= node->val || node->val >= right.min) {
            // Size and range are junk here: the parent sees the false
            // flag first and never reads them.
            return Report{false, 0, 0, 0};
        }
        int size = 1 + left.size + right.size;
        return Report{true, size, std::min(node->val, left.min), std::max(node->val, right.max)};
    }
};
