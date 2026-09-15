class Solution {
  public:
    int majorityElement(vector<int> &nums) {
        // Sorting turns the count into a position: equal values form one
        // run, the majority's run is longer than half the array, and a run
        // that long always covers the middle index n / 2.
        sort(nums.begin(), nums.end());
        // Whatever order the input arrived in, the middle of the sorted
        // order is the majority.
        return nums[nums.size() / 2];
    }
};
