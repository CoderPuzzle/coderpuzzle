class Solution {
  public:
    vector<int> maxSlidingWindow(vector<int> &nums, int k) {
        int n = nums.size();
        // Max-heap of (value, index) records; pair ordering compares value first.
        priority_queue<pair<int, int>> heap;
        vector<int> result;
        result.reserve(n >= k ? n - k + 1 : 0);
        for (int i = 0; i < n; ++i) {
            heap.push({nums[i], i});
            // Lazy deletion: pop records whose index has slid out of the window.
            while (heap.top().second <= i - k)
                heap.pop();
            // The top is now the largest value still inside the window.
            if (i >= k - 1)
                result.push_back(heap.top().first);
        }
        return result;
    }
};
