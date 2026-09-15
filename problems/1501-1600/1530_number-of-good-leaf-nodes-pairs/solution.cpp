class Solution {
  public:
    int countPairs(TreeNode *root, int distance) {
        // Every good pair's path bends at its lowest common ancestor, so
        // counting pairs reduces to counting, at each node, how many ways a
        // leaf on one side meets a leaf on the other within budget.
        // Postorder gives each node its children's answers first: a table
        // indexed by relative depth (0..distance) counting leaves that many
        // edges below. The tree can hold up to 2^10 nodes and a skewed
        // instance packs them into one chain — deep enough that the judge's
        // constrained stacks make recursion risky — so both the traversal
        // and the merge run off explicit stacks instead of the call stack.

        // Build the "root, right, left" visiting order with one stack;
        // reversed, that order is exactly postorder (left, right, root).
        vector<TreeNode *> stack{root};
        vector<TreeNode *> order;
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            order.push_back(node);
            if (node->left != nullptr)
                stack.push_back(node->left);
            if (node->right != nullptr)
                stack.push_back(node->right);
        }

        int answer = 0;
        vector<vector<int>> valueStack;
        for (auto it = order.rbegin(); it != order.rend(); ++it) {
            TreeNode *node = *it;
            bool hasLeft = node->left != nullptr;
            bool hasRight = node->right != nullptr;
            if (!hasLeft && !hasRight) {
                vector<int> freq(distance + 1, 0);
                freq[0] = 1;
                valueStack.push_back(std::move(freq));
                continue;
            }

            // Postorder guarantees the right child's table (if any) was
            // pushed most recently, then the left child's.
            vector<int> rightFreq;
            if (hasRight) {
                rightFreq = std::move(valueStack.back());
                valueStack.pop_back();
            }
            vector<int> leftFreq;
            if (hasLeft) {
                leftFreq = std::move(valueStack.back());
                valueStack.pop_back();
            }

            vector<int> merged(distance + 1, 0);
            if (hasLeft && hasRight) {
                for (int d1 = 0; d1 <= distance; d1++) {
                    if (leftFreq[d1] == 0)
                        continue;
                    int budget = distance - d1 - 2;
                    if (budget < 0)
                        continue;
                    int upper = std::min(budget, distance);
                    for (int d2 = 0; d2 <= upper; d2++) {
                        if (rightFreq[d2] != 0)
                            answer += leftFreq[d1] * rightFreq[d2];
                    }
                }
                for (int d = 0; d < distance; d++)
                    merged[d + 1] += leftFreq[d] + rightFreq[d];
            } else if (hasLeft) {
                for (int d = 0; d < distance; d++)
                    merged[d + 1] += leftFreq[d];
            } else {
                for (int d = 0; d < distance; d++)
                    merged[d + 1] += rightFreq[d];
            }
            valueStack.push_back(std::move(merged));
        }

        return answer;
    }
};
