class Solution {
  public:
    int majorityElement(vector<int> &nums) {
        // Sort in place: the majority's occurrences stand together as one
        // run longer than half the array, and a run that long must cover
        // the middle -- so the value at the halfway index is the majority,
        // whatever the input order was.
        sort(nums.begin(), nums.end());
        return nums[nums.size() / 2];
    }
};
