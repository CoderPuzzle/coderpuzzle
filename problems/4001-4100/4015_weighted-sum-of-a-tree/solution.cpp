class Solution {
  public:
    long long weightedSum(vector<int> &parent, vector<int> &nums) {
        int n = parent.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; ++i) {
            children[parent[i]].push_back(i);
        }

        vector<int> depth(n, 0);
        vector<int> queue;
        queue.reserve(n);
        depth[0] = 1;
        queue.push_back(0);
        for (size_t head = 0; head < queue.size(); ++head) {
            int node = queue[head];
            for (int child : children[node]) {
                depth[child] = depth[node] + 1;
                queue.push_back(child);
            }
        }

        int height = 0;
        for (int i = 0; i < n; ++i) {
            height = max(height, depth[i]);
        }

        long long total = 0;
        for (int i = 0; i < n; ++i) {
            total += (long long)nums[i] * (height - depth[i] + 1);
        }
        return total;
    }
};
