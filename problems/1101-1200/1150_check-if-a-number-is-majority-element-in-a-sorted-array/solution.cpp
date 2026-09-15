class Solution {
  public:
    bool isMajorityElement(vector<int> &nums, int target) {
        // Sorted array: the target's occurrences form one contiguous run,
        // whose length is the distance between the two search boundaries.
        auto low = lower_bound(nums.begin(), nums.end(), target);
        auto high = upper_bound(nums.begin(), nums.end(), target);
        return 2 * (high - low) > (ptrdiff_t)nums.size();
    }
};
