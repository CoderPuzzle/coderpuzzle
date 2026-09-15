class Solution {
  public:
    long long kSum(vector<int> &nums, int k) {
        // every subsequence sum = base - (subset sum of absolute values)
        long long base = 0;
        for (int x : nums) {
            if (x > 0) {
                base += x;
            }
        }
        vector<long long> costs;
        costs.reserve(nums.size());
        for (int x : nums) {
            costs.push_back(llabs((long long)x));
        }
        sort(costs.begin(), costs.end());
        if (k == 1) {
            return base;
        }
        int n = (int)costs.size();
        // min-heap of (sum, idx); ties on sum broken by smaller idx
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        heap.push({costs[0], 0});
        long long count = 1; // empty subset (sum 0) is the 1st smallest
        while (count < k) {
            auto [cur, idx] = heap.top();
            heap.pop();
            count++;
            if (count == k) {
                return base - cur;
            }
            if (idx + 1 < n) {
                heap.push({cur - costs[idx] + costs[idx + 1], idx + 1});
                heap.push({cur + costs[idx + 1], idx + 1});
            }
        }
        return base;
    }
};
