class Solution {
  public:
    vector<long long> unmarkedSumArray(vector<int> &nums, vector<vector<int>> &queries) {
        // Marking only ever removes elements, so one monotone sweep over the
        // indices sorted by (value, index) answers every query's "k smallest
        // unmarked" step: the pointer skips entries marked by name and never
        // revisits one. A running total absorbs each mark — it can reach
        // 10^5 * 10^5 = 10^10, beyond int, so the total is a long long.
        int n = nums.size();
        vector<int> order(n);
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) { return nums[a] != nums[b] ? nums[a] < nums[b] : a < b; });
        vector<bool> marked(n, false);
        long long total = 0;
        for (int num : nums) {
            total += num;
        }
        int pointer = 0;
        vector<long long> answer;
        answer.reserve(queries.size());
        for (const vector<int> &query : queries) {
            int index = query[0];
            int count = query[1];
            if (!marked[index]) {
                marked[index] = true;
                total -= nums[index];
            }
            int taken = 0;
            while (taken < count && pointer < n) {
                int candidate = order[pointer];
                pointer++;
                if (marked[candidate]) {
                    continue;
                }
                marked[candidate] = true;
                total -= nums[candidate];
                taken++;
            }
            answer.push_back(total);
        }
        return answer;
    }
};
