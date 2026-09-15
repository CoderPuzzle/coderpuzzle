class Solution {
  public:
    vector<vector<int>> findLeaves(TreeNode *root) {
        vector<vector<int>> groups;
        height(root, groups);
        return groups;
    }

  private:
    // Post-order: each call reports the height of the subtree rooted at
    // `node` (a leaf is height 0) and files the node's value into that
    // height's group as the recursion unwinds — collecting leaves round by
    // round is just sorting the nodes by height, and finishing the left
    // subtree before entering the right one pins each group to
    // left-to-right order.
    int height(TreeNode *node, vector<vector<int>> &groups) {
        if (node == nullptr) {
            return -1;
        }
        int left_height = height(node->left, groups);
        int right_height = height(node->right, groups);
        int node_height = 1 + max(left_height, right_height);
        // A first sighting of a height always arrives after every smaller
        // height has been seen, so this grows the list by exactly one.
        if (node_height == static_cast<int>(groups.size())) {
            groups.emplace_back();
        }
        groups[node_height].push_back(node->val);
        return node_height;
    }
};
