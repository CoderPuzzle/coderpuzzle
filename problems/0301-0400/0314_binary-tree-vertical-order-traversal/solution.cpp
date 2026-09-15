class Solution {
  public:
    vector<vector<int>> verticalOrder(TreeNode *root) {
        if (root == nullptr) {
            return {};
        }
        // (node, column) pairs advance level by level: dequeue order is
        // top-to-bottom, and within a row left-to-right — exactly the
        // ordering the answer needs, so appending as we dequeue is enough.
        unordered_map<int, vector<int>> columns;
        queue<pair<TreeNode *, int>> pending;
        pending.push({root, 0});
        int leftmost = 0;
        int rightmost = 0;
        while (!pending.empty()) {
            auto [node, column] = pending.front();
            pending.pop();
            columns[column].push_back(node->val);
            leftmost = min(leftmost, column);
            rightmost = max(rightmost, column);
            if (node->left != nullptr) {
                pending.push({node->left, column - 1});
            }
            if (node->right != nullptr) {
                pending.push({node->right, column + 1});
            }
        }
        // The visited columns form one contiguous range (columns only ever
        // move by one), so the minimum-to-maximum sweep misses nothing.
        vector<vector<int>> out;
        out.reserve(rightmost - leftmost + 1);
        for (int column = leftmost; column <= rightmost; column++) {
            out.push_back(move(columns[column]));
        }
        return out;
    }
};
