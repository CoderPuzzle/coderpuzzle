class Solution {
  public:
    int numSubarraysWithSum(vector<int> &nums, int goal) {
        // A subarray's sum is the difference of two prefix sums, so the
        // windows ending here with sum goal pair exactly with the earlier
        // prefixes worth prefix - goal. A hash map counting each prefix sum
        // seen so far answers that lookup in O(1) per position.
        int count = 0;
        int prefix = 0;
        unordered_map<int, int> seen;
        seen[0] = 1;
        for (int value : nums) {
            prefix += value;
            auto it = seen.find(prefix - goal);
            if (it != seen.end()) {
                count += it->second;
            }
            ++seen[prefix];
        }
        return count;
    }
};
