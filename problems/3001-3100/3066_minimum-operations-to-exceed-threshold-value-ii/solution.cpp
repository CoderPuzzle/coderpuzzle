class Solution {
  public:
    int minOperations(vector<int> &nums, int k) {
        priority_queue<long long, vector<long long>, greater<long long>> heap(nums.begin(), nums.end());
        int operations = 0;
        // Each operation must consume the two smallest values, so the process
        // is fully deterministic once the array sits in a min-heap.
        // Done when the minimum reaches k (then every element has) or fewer
        // than two elements remain.
        while (heap.size() >= 2 && heap.top() < k) {
            long long x = heap.top();
            heap.pop();
            long long y = heap.top();
            heap.pop();
            // x is the smaller pop by heap order, so this is min*2 + max.
            heap.push(x * 2 + y);
            operations++;
        }
        return operations;
    }
};
