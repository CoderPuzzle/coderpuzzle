#include <vector>

class Solution {
  public:
    int longestConsecutive(TreeNode *root) {
        // Post-order, one pass: every node reports the pair of runs that
        // top out at it — the longest whose values step +1 downward away
        // from the node (inc) and the longest stepping -1 (dec). A child
        // valued exactly node.val + 1 extends inc with its own inc, one
        // valued node.val - 1 extends dec, and any other child extends
        // nothing. A valid path is monotone, so it turns at exactly one
        // node — the topmost node of the path, one arm descending into
        // each child subtree — and its length there is inc + dec - 1;
        // the answer is the maximum of that over all nodes. The
        // traversal carries its own stack of frames: the tree may be a
        // single 3*10^4-node chain, whose pass nests 30000 calls —
        // needlessly at the mercy of the runtime call stack.
        int best = 0;
        // Frame = a node, which child remains to visit (0 = left pending,
        // 1 = right pending, 2 = ready to judge), and the two child runs
        // already collected.
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
                Run run = judge(frame);
                stack.pop_back();
                if (run.inc + run.dec - 1 > best) {
                    best = run.inc + run.dec - 1;
                }
                if (!stack.empty()) {
                    Frame &parent = stack.back();
                    if (parent.state == 1) {
                        parent.left = run;
                    } else {
                        parent.right = run;
                    }
                }
            }
        }
        return best;
    }

  private:
    // The runs topping out at a node — the longest +1-downward and the
    // longest -1-downward — together with that node's value.
    struct Run {
        int inc;
        int dec;
        int val;
    };

    // A node under judgement, accumulating its children's runs.
    struct Frame {
        TreeNode *node;
        int state;
        Run left;
        Run right;

        explicit Frame(TreeNode *node) : node(node), state(0), left(EMPTY), right(EMPTY) {}
    };

    // An absent child is a run of length 0; a real run always has
    // inc >= 1, so the 0 flags it.
    inline static constexpr Run EMPTY{0, 0, 0};

    // Judge one node from the two runs its children produced: each child
    // whose value is exactly one step out extends the matching run by
    // that child's own.
    static Run judge(const Frame &frame) {
        TreeNode *node = frame.node;
        int inc = 1;
        int dec = 1;
        for (Run child : {frame.left, frame.right}) {
            if (child.inc > 0) {
                if (child.val == node->val + 1 && child.inc + 1 > inc) {
                    inc = child.inc + 1;
                }
                if (child.val == node->val - 1 && child.dec + 1 > dec) {
                    dec = child.dec + 1;
                }
            }
        }
        return Run{inc, dec, node->val};
    }
};
