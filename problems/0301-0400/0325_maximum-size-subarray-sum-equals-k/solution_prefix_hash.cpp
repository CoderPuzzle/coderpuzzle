class Solution {
  public:
    int maxSubArrayLen(vector<int> &nums, int k) {
        // first[prefix] = earliest index that prefix value occurred; the
        // seed 0: -1 lets a subarray starting at index 0 be found.
        unordered_map<long long, int> first;
        first[0] = -1;
        long long acc = 0;
        int best = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            acc += nums[i];
            // Subarray (j, i] sums to k exactly when the earlier prefix
            // equals acc - k; earliest j gives the longest subarray.
            auto it = first.find(acc - (long long)k);
            if (it != first.end() && i - it->second > best) {
                best = i - it->second;
            }
            // Keep only the first occurrence per prefix value — a later
            // duplicate would only shorten future subarrays.
            if (first.find(acc) == first.end()) {
                first[acc] = i;
            }
        }
        return best;
    }
};
