class Solution {
  public:
    int pathSum(TreeNode *root, int targetSum) {
        // counter maps root-to-node prefix sums seen on the current path to
        // their counts; {0: 1} counts paths starting at a node itself.
        unordered_map<long long, long long> counter;
        counter[0] = 1;
        return dfs(root, 0, targetSum, counter);
    }

  private:
    long long dfs(TreeNode *node, long long running, int targetSum, unordered_map<long long, long long> &counter) {
        if (node == nullptr) {
            return 0;
        }
        running += node->val;
        // A path ending here with the target starts at an ancestor whose
        // prefix equals running - targetSum (prefix(v) - prefix(u) trick).
        long long total = counter.count(running - targetSum) ? counter[running - targetSum] : 0;
        // Register this prefix only after the lookup, then recurse.
        counter[running] += 1;
        total += dfs(node->left, running, targetSum, counter);
        total += dfs(node->right, running, targetSum, counter);
        // Undo on backtrack: left-subtree prefixes must not pair with
        // right-subtree nodes, so lookups see true ancestors only.
        counter[running] -= 1;
        return total;
    }
};
