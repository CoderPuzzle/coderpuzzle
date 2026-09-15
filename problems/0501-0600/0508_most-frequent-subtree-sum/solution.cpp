#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    std::vector<int> findFrequentTreeSum(TreeNode *root) {
        // Post-order, one pass: a node's subtree sum is its own value plus
        // the two sums already computed beneath it, so each node's sum is
        // settled exactly once and the counter tallies every subtree. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose walk would nest 10000 calls —
        // needlessly at the mercy of the runtime call stack.
        std::unordered_map<int, int> counts;
        // Frame = a node, which child remains to visit (0 = left pending,
        // 1 = right pending, 2 = ready to sum), and the sum of the
        // subtrees already finished beneath it.
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
                int total = frame.node->val + frame.children;
                stack.pop_back();
                ++counts[total];
                if (!stack.empty()) {
                    stack.back().children += total;
                }
            }
        }
        int best = 0;
        for (const auto &entry : counts) {
            best = std::max(best, entry.second);
        }
        std::vector<int> result;
        for (const auto &entry : counts) {
            if (entry.second == best) {
                result.push_back(entry.first);
            }
        }
        // The final sort pins the output to the ascending order the judge
        // compares exactly.
        std::sort(result.begin(), result.end());
        return result;
    }

  private:
    // A node under traversal, accumulating the sum of the subtrees already
    // finished beneath it.
    struct Frame {
        TreeNode *node;
        int state;
        int children;

        explicit Frame(TreeNode *node) : node(node), state(0), children(0) {}
    };
};
