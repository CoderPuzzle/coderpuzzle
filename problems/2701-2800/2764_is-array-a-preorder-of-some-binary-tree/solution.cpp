class Solution {
  public:
    bool isPreorder(vector<vector<int>> &nodes) {
        // Stack of ancestors whose subtrees are still open. Popping until the
        // parent surfaces closes every subtree finished since the last visit;
        // an empty stack before that means the parent is gone for good.
        vector<int> stack;
        stack.reserve(nodes.size());
        for (size_t i = 0; i < nodes.size(); ++i) {
            int nodeId = nodes[i][0];
            int parentId = nodes[i][1];
            if (i == 0) {
                if (parentId != -1) {
                    return false;
                }
            } else {
                while (!stack.empty() && stack.back() != parentId) {
                    stack.pop_back();
                }
                if (stack.empty()) {
                    return false;
                }
            }
            stack.push_back(nodeId);
        }
        return true;
    }
};
