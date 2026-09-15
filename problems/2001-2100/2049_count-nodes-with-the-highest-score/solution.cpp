class Solution {
  public:
    int countHighestScoreNodes(vector<int> &parents) {
        int n = static_cast<int>(parents.size());
        vector<vector<int>> children(n);
        for (int node = 1; node < n; ++node) {
            children[parents[node]].push_back(node);
        }

        vector<int> order;
        order.reserve(n);
        vector<int> stack = {0};
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            order.push_back(node);
            for (int child : children[node]) {
                stack.push_back(child);
            }
        }

        vector<int> subtree(n, 1);
        long long highest = 0;
        int count = 0;
        for (int index = static_cast<int>(order.size()) - 1; index >= 0; --index) {
            int node = order[index];
            int size = 1;
            long long score = 1;
            for (int child : children[node]) {
                size += subtree[child];
                score *= subtree[child];
            }
            subtree[node] = size;
            int outside = n - size;
            if (outside != 0) {
                score *= outside;
            }
            if (score > highest) {
                highest = score;
                count = 1;
            } else if (score == highest) {
                ++count;
            }
        }
        return count;
    }
};
