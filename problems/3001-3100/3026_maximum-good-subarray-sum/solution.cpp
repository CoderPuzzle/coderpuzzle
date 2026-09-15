class Solution {
  public:
    long long maximumSubarraySum(vector<int> &nums, int k) {
        unordered_map<long long, long long> best; // value -> minimum prefix sum P[i] for a start i
        best[(long long)nums[0]] = 0;
        long long prefix = 0;
        bool found = false;
        long long ans = 0;
        int n = nums.size();
        for (int j = 0; j < n; j++) {
            prefix += nums[j]; // P[j+1]
            long long v = nums[j];
            long long candidates[2] = {v - k, v + k};
            for (long long candidate : candidates) {
                auto it = best.find(candidate);
                if (it != best.end()) {
                    long long value = prefix - it->second;
                    if (!found || value > ans) {
                        found = true;
                        ans = value;
                    }
                }
            }
            if (j + 1 < n) {
                long long next = nums[j + 1];
                auto it = best.find(next);
                if (it == best.end() || prefix < it->second)
                    best[next] = prefix;
            }
        }
        return found ? ans : 0;
    }
};
