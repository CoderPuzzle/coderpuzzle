class Solution {
  public:
    vector<int> maxSlidingWindow(vector<int> &nums, int k) {
        int n = nums.size();
        vector<int> dq(n);      // indices, values decreasing
        int head = 0, tail = 0; // half-open range [head, tail)
        vector<int> result;
        result.reserve(n >= k ? n - k + 1 : 0);
        for (int i = 0; i < n; ++i) {
            int value = nums[i];
            while (tail > head && nums[dq[tail - 1]] <= value)
                --tail;
            dq[tail++] = i;
            if (dq[head] <= i - k)
                ++head;
            if (i >= k - 1)
                result.push_back(nums[dq[head]]);
        }
        return result;
    }
};
