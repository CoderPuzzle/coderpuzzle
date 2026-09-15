class Solution {
  public:
    int shortestSubarray(vector<int> &nums, int k) {
        int n = nums.size();
        // Negatives break the sliding-window trick, so reason in
        // prefix sums: a subarray sum is prefix[i] - prefix[j], and
        // the sentinel prefix[0] = 0 lets subarrays starting at 0
        // compete.
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Deque of start indices whose prefix sums strictly increase
        // front to back.
        deque<int> dq;
        int best = n + 1;
        for (int i = 0; i <= n; i++) {
            long long p = prefix[i];
            // Consume qualifying fronts: each offers length i - front,
            // and popping is safe because later ends only lengthen the
            // same start.
            while (!dq.empty() && prefix[dq.front()] <= p - k) {
                best = min(best, i - dq.front());
                dq.pop_front();
            }
            // A later index with an equal-or-smaller prefix dominates
            // as a future start, so trim the tail.
            while (!dq.empty() && prefix[dq.back()] >= p) {
                dq.pop_back();
            }
            dq.push_back(i);
        }
        return best <= n ? best : -1;
    }
};
