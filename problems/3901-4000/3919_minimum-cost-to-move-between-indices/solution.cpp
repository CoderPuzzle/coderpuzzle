class Solution {
  public:
    vector<int> minCost(vector<int> &nums, vector<vector<int>> &queries) {
        int n = (int)nums.size();
        vector<int> forward(max(n - 1, 0), 0);
        vector<int> backward(max(n - 1, 0), 0);

        for (int i = 0; i < n; ++i) {
            int closest;
            if (i == 0)
                closest = 1;
            else if (i == n - 1)
                closest = n - 2;
            else {
                int left = nums[i] - nums[i - 1];
                int right = nums[i + 1] - nums[i];
                closest = left <= right ? i - 1 : i + 1;
            }
            if (i > 0)
                backward[i - 1] = closest == i - 1 ? 1 : nums[i] - nums[i - 1];
            if (i < n - 1)
                forward[i] = closest == i + 1 ? 1 : nums[i + 1] - nums[i];
        }

        vector<long long> prefixForward(n, 0), prefixBackward(n, 0);
        for (int i = 1; i < n; ++i) {
            prefixForward[i] = prefixForward[i - 1] + forward[i - 1];
            prefixBackward[i] = prefixBackward[i - 1] + backward[i - 1];
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            int left = query[0], right = query[1];
            if (left <= right)
                answer.push_back((int)(prefixForward[right] - prefixForward[left]));
            else
                answer.push_back((int)(prefixBackward[left] - prefixBackward[right]));
        }
        return answer;
    }
};
