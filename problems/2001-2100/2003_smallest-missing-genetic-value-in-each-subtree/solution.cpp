class Solution {
  public:
    vector<int> smallestMissingValueSubtree(vector<int> &parents, vector<int> &nums) {
        int n = (int)parents.size();
        vector<vector<int>> children(n);
        int oneNode = -1;
        for (int node = 0; node < n; ++node) {
            if (parents[node] != -1) {
                children[parents[node]].push_back(node);
            }
            if (nums[node] == 1) {
                oneNode = node;
            }
        }

        vector<int> answers(n, 1);
        if (oneNode == -1) {
            return answers;
        }

        vector<bool> visited(n, false);
        vector<bool> present(n + 2, false);
        int missing = 1;
        for (int ancestor = oneNode; ancestor != -1; ancestor = parents[ancestor]) {
            vector<int> stack = {ancestor};
            while (!stack.empty()) {
                int node = stack.back();
                stack.pop_back();
                if (visited[node]) {
                    continue;
                }
                visited[node] = true;
                if (nums[node] < (int)present.size()) {
                    present[nums[node]] = true;
                }
                for (int child : children[node]) {
                    stack.push_back(child);
                }
            }
            while (present[missing]) {
                ++missing;
            }
            answers[ancestor] = missing;
        }
        return answers;
    }
};
