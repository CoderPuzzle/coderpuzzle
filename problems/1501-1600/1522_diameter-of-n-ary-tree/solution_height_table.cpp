class Solution {
  public:
    int diameter(Node *root) {
        if (root == nullptr)
            return 0;

        // Pass one: every node's height -- its longest downward arm in
        // edges -- materialized into a table keyed by the node.
        unordered_map<const Node *, int> height;
        measure(root, height);

        // Pass two: the widest bend at each node pairs its two tallest
        // child arms; absent arms read -1, so a leaf scores 0.
        int best = 0;
        vector<const Node *> stack{root};
        while (!stack.empty()) {
            const Node *node = stack.back();
            stack.pop_back();
            int first = -1, second = -1;
            for (const Node *child : node->children) {
                stack.push_back(child);
                int arm = height.at(child);
                if (arm > first) {
                    second = first;
                    first = arm;
                } else if (arm > second) {
                    second = arm;
                }
            }
            best = max(best, first + second + 2);
        }
        return best;
    }

  private:
    static int measure(const Node *node, unordered_map<const Node *, int> &height) {
        int tallest = -1;
        for (const Node *child : node->children)
            tallest = max(tallest, measure(child, height));
        height[node] = tallest + 1;
        return tallest + 1;
    }
};
