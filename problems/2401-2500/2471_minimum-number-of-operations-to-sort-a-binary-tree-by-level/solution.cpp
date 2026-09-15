class Solution {
  public:
    int minimumOperations(TreeNode *root) {
        if (root == nullptr)
            return 0;
        int total = 0;
        deque<TreeNode *> queue;
        queue.push_back(root);
        while (!queue.empty()) {
            int size = queue.size();
            vector<int> level;
            level.reserve(size);
            for (int s = 0; s < size; s++) {
                TreeNode *node = queue.front();
                queue.pop_front();
                level.push_back(node->val);
                if (node->left != nullptr)
                    queue.push_back(node->left);
                if (node->right != nullptr)
                    queue.push_back(node->right);
            }
            // Minimum swaps to sort this level = sum of (cycle length - 1).
            vector<int> target(level);
            sort(target.begin(), target.end());
            unordered_map<int, int> pos;
            for (int i = 0; i < (int)level.size(); i++)
                pos[level[i]] = i;
            vector<bool> visited(level.size(), false);
            for (int i = 0; i < (int)level.size(); i++) {
                if (visited[i] || level[i] == target[i]) {
                    visited[i] = true;
                    continue;
                }
                int j = i;
                int cycle = 0;
                while (!visited[j]) {
                    visited[j] = true;
                    cycle++;
                    j = pos[target[j]];
                }
                total += cycle - 1;
            }
        }
        return total;
    }
};
